import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    menuItemId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    size: { type: String, enum: ["regular", "large"], default: "regular" },
    milk: {
      type: String,
      enum: ["whole", "oat", "almond", "none"],
      default: "whole",
    },
    notes: { type: String, default: "" },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, default: "", trim: true },
    passwordHash: { type: String, required: true },
    memberSince: { type: Date, default: Date.now },
    rewardsPoints: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    activeOffers: {
      type: [String],
      default: ["welcome-10", "free-upgrade", "pastry-friday"],
    },
    cart: {
      items: { type: [cartItemSchema], default: [] },
      checkout: {
        pickupTime: { type: String, default: "In 30 min" },
        orderNotes: { type: String, default: "" },
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    memberSince: this.memberSince,
    rewardsPoints: this.rewardsPoints,
    orderCount: this.orderCount,
    activeOffers: this.activeOffers,
    phone: this.phone || undefined,
  };
};

export const User = mongoose.model("User", userSchema);
