import mongoose from "mongoose";

const orderLineSchema = new mongoose.Schema(
  {
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, default: "regular" },
    milk: { type: String, default: "whole" },
    notes: { type: String, default: "" },
    unitPrice: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderId: { type: String, required: true, unique: true },
    items: { type: [orderLineSchema], required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["card", "cash", "apple_pay"],
      required: true,
    },
    appliedOffers: { type: [String], default: [] },
    pickupTime: { type: String, default: "" },
    orderNotes: { type: String, default: "" },
    status: { type: String, enum: ["paid"], default: "paid" },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
