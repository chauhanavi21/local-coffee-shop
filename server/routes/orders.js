import { Router } from "express";
import { Order } from "../models/Order.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

function serializeOrder(order) {
  return {
    id: order._id?.toString?.() ?? order.id ?? order.orderId,
    orderId: order.orderId ?? "Unknown",
    items: (order.items ?? []).map((line) => ({
      menuItemId: line.menuItemId ?? "",
      name: line.name ?? "Menu item",
      quantity: Number(line.quantity ?? 1),
      size: line.size ?? "regular",
      milk: line.milk ?? "none",
      notes: line.notes ?? "",
      unitPrice: Number(line.unitPrice ?? 0),
      lineTotal: Number(line.lineTotal ?? 0),
    })),
    subtotal: Number(order.subtotal ?? 0),
    discount: Number(order.discount ?? 0),
    tax: Number(order.tax ?? 0),
    total: Number(order.total ?? 0),
    paymentMethod: order.paymentMethod ?? "card",
    appliedOffers: order.appliedOffers ?? [],
    promoCode: order.promoCode ?? "",
    pickupTime: order.pickupTime ?? "",
    orderNotes: order.orderNotes ?? "",
    status: order.status ?? "paid",
    createdAt: order.createdAt ?? new Date(),
  };
}

router.get("/", authRequired, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({
      orders: orders.map(serializeOrder),
    });
  } catch (err) {
    console.error("Orders list error:", err);
    res.status(500).json({ error: "Could not load orders" });
  }
});

export default router;
