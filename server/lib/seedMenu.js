import { MenuItem } from "../models/MenuItem.js";
import { RetailBean } from "../models/RetailBean.js";
import { MENU_SEED, RETAIL_SEED } from "../data/menuSeed.js";

export async function seedMenuIfEmpty() {
  const menuCount = await MenuItem.countDocuments();
  if (menuCount === 0) {
    await MenuItem.insertMany(MENU_SEED);
    console.log(`Seeded ${MENU_SEED.length} menu items`);
  }

  const beanCount = await RetailBean.countDocuments();
  if (beanCount === 0) {
    await RetailBean.insertMany(RETAIL_SEED);
    console.log(`Seeded ${RETAIL_SEED.length} retail beans`);
  }
}
