import { Router } from "express";
import { MenuItem } from "../models/MenuItem.js";
import { RetailBean } from "../models/RetailBean.js";
import { MENU_CATEGORIES } from "../data/menuSeed.js";

const router = Router();

function serializeItem(doc) {
  return {
    id: doc.slug,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    image: doc.image,
    tag: doc.tag || undefined,
    featured: doc.featured,
  };
}

router.get("/", async (_req, res) => {
  try {
    const items = await MenuItem.find({ active: true }).sort({ sortOrder: 1 });
    const retailBeans = await RetailBean.find({ active: true }).sort({ sortOrder: 1 });
    const featured = items.filter((item) => item.featured).map(serializeItem);

    res.json({
      categories: MENU_CATEGORIES,
      items: items.map(serializeItem),
      retailBeans: retailBeans.map((bean) => ({
        name: bean.name,
        price: bean.price,
        note: bean.note,
      })),
      featured,
    });
  } catch (err) {
    console.error("Menu fetch error:", err);
    res.status(500).json({ error: "Could not load menu" });
  }
});

export default router;
