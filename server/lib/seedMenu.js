import { MenuItem } from "../models/MenuItem.js";
import { RetailBean } from "../models/RetailBean.js";
import { MENU_SEED, RETAIL_SEED } from "../data/menuSeed.js";

export async function seedMenuIfEmpty() {
  for (const item of MENU_SEED) {
    await MenuItem.findOneAndUpdate({ slug: item.slug }, { $set: item }, { upsert: true });
  }
  console.log(`Synced ${MENU_SEED.length} menu items (images + details)`);

  const beanCount = await RetailBean.countDocuments();
  if (beanCount === 0) {
    await RetailBean.insertMany(RETAIL_SEED);
    console.log(`Seeded ${RETAIL_SEED.length} retail beans`);
  }
}
