import { Router } from "express";
import { Order } from "../models/Order.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.get("/", authRequired, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      orders: orders.map((o) => ({
        id: o._id.toString(),
        orderId: o.orderId,
        items: o.items,
        subtotal: o.subtotal,
        discount: o.discount,
        tax: o.tax,
        total: o.total,
        paymentMethod: o.paymentMethod,
        appliedOffers: o.appliedOffers,
        pickupTime: o.pickupTime,
        orderNotes: o.orderNotes,
        status: o.status,
        createdAt: o.createdAt,
      })),
    });
  } catch (err) {
    console.error("Orders list error:", err);
    res.status(500).json({ error: "Could not load orders" });
  }
});

export default router;
