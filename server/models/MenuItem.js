import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["coffee", "tea", "breakfast", "baked-goods", "lunch"],
      required: true,
    },
    image: { type: String, required: true },
    tag: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
