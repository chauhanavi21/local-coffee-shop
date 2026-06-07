import { Router } from "express";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { authRequired } from "../middleware/auth.js";
import { MenuItem } from "../models/MenuItem.js";
import { computeTotals, lineUnitPrice } from "../lib/pricing.js";
import { findPromoCode } from "../data/promoCodes.js";

const router = Router();

function buildItemKey(menuItemId, size, milk, notes) {
  return `${menuItemId}-${size}-${milk}-${notes || ""}`;
}

function serializeCart(user) {
  return {
    items: user.cart.items,
    checkout: user.cart.checkout,
  };
}

router.get("/", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ cart: serializeCart(user) });
  } catch (err) {
    res.status(500).json({ error: "Could not load cart" });
  }
});

router.post("/items", authRequired, async (req, res) => {
  try {
    const { menuItemId, size = "regular", milk = "whole", notes = "", quantity = 1 } =
      req.body;

    const menuItem = await MenuItem.findOne({ slug: menuItemId, active: true });
    if (!menuItem) {
      return res.status(400).json({ error: "Invalid menu item" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const key = buildItemKey(menuItemId, size, milk, notes.trim());
    const existing = user.cart.items.find((i) => i.key === key);

    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.items.push({
        key,
        menuItemId,
        size,
        milk,
        notes: notes.trim(),
        quantity,
      });
    }

    await user.save();
    res.json({ cart: serializeCart(user) });
  } catch (err) {
    console.error("Add cart item error:", err);
    res.status(500).json({ error: "Could not add item" });
  }
});

router.patch("/items/:key/quantity", authRequired, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const item = user.cart.items.find((i) => i.key === req.params.key);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (quantity <= 0) {
      user.cart.items = user.cart.items.filter((i) => i.key !== req.params.key);
    } else {
      item.quantity = quantity;
    }

    await user.save();
    res.json({ cart: serializeCart(user) });
  } catch (err) {
    res.status(500).json({ error: "Could not update item" });
  }
});

router.delete("/items/:key", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart.items = user.cart.items.filter((i) => i.key !== req.params.key);
    await user.save();
    res.json({ cart: serializeCart(user) });
  } catch (err) {
    res.status(500).json({ error: "Could not remove item" });
  }
});

router.patch("/checkout", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.body.pickupTime !== undefined) {
      user.cart.checkout.pickupTime = req.body.pickupTime;
    }
    if (req.body.orderNotes !== undefined) {
      user.cart.checkout.orderNotes = req.body.orderNotes;
    }

    await user.save();
    res.json({ cart: serializeCart(user) });
  } catch (err) {
    res.status(500).json({ error: "Could not update checkout details" });
  }
});

router.post("/promo/validate", authRequired, async (req, res) => {
  try {
    const promo = findPromoCode(req.body.code);
    if (!promo) {
      return res.status(404).json({ error: "Invalid promo code" });
    }
    res.json({ promo });
  } catch (err) {
    res.status(500).json({ error: "Could not validate promo code" });
  }
});

router.post("/complete", authRequired, async (req, res) => {
  try {
    const { paymentMethod, appliedOffers = [], promoCode = "" } = req.body;

    if (!["card", "cash", "apple_pay"].includes(paymentMethod)) {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.cart.items.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const offerIds = Array.isArray(appliedOffers)
      ? appliedOffers.filter((id) => user.activeOffers.includes(id))
      : [];

    const menuItems = await MenuItem.find({
      slug: { $in: user.cart.items.map((i) => i.menuItemId) },
    });
    const menuById = new Map(menuItems.map((m) => [m.slug, m]));

    for (const row of user.cart.items) {
      if (!menuById.has(row.menuItemId)) {
        return res.status(400).json({ error: "Invalid item in cart" });
      }
    }

    const normalizedPromo = promoCode?.trim().toUpperCase() || "";
    if (normalizedPromo && !findPromoCode(normalizedPromo)) {
      return res.status(400).json({ error: "Invalid promo code" });
    }

    const { subtotal, discount, tax, total } = computeTotals(
      user.cart.items,
      menuById,
      user.orderCount,
      offerIds,
      normalizedPromo,
    );

    const orderLines = user.cart.items.map((row) => {
      const menuItem = menuById.get(row.menuItemId);
      const unitPrice = lineUnitPrice(menuItem, row.size);
      return {
        menuItemId: row.menuItemId,
        name: menuItem.name,
        quantity: row.quantity,
        size: row.size,
        milk: row.milk,
        notes: row.notes || "",
        unitPrice,
        lineTotal: unitPrice * row.quantity,
      };
    });

    const orderId = `PJ-${Date.now().toString().slice(-8)}`;

    const order = await Order.create({
      userId: user._id,
      orderId,
      items: orderLines,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod,
      appliedOffers: offerIds,
      promoCode: normalizedPromo,
      pickupTime: user.cart.checkout.pickupTime,
      orderNotes: user.cart.checkout.orderNotes,
      status: "paid",
    });

    user.orderCount += 1;
    user.rewardsPoints += 10;
    user.cart.items = [];
    user.cart.checkout.orderNotes = "";

    await user.save();

    res.json({
      order: {
        id: order._id.toString(),
        orderId: order.orderId,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        total: order.total,
        paymentMethod: order.paymentMethod,
        appliedOffers: order.appliedOffers,
        promoCode: order.promoCode,
        pickupTime: order.pickupTime,
        createdAt: order.createdAt,
      },
      user: user.toPublicJSON(),
      cart: serializeCart(user),
    });
  } catch (err) {
    console.error("Complete order error:", err);
    res.status(500).json({ error: "Could not complete order" });
  }
});

export default router;
