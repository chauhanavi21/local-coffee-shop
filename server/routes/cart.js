import { Router } from "express";
import { User } from "../models/User.js";
import { authRequired } from "../middleware/auth.js";
import { MenuItem } from "../models/MenuItem.js";

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

router.post("/complete", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.orderCount += 1;
    user.rewardsPoints += 10;
    user.cart.items = [];
    user.cart.checkout.orderNotes = "";

    await user.save();
    res.json({
      user: user.toPublicJSON(),
      cart: serializeCart(user),
    });
  } catch (err) {
    res.status(500).json({ error: "Could not complete order" });
  }
});

export default router;
