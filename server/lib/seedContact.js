import { ContactInfo } from "../models/ContactInfo.js";
import { CONTACT_SEED } from "../data/contactSeed.js";

export async function seedContactInfo() {
  await ContactInfo.findOneAndUpdate(
    { key: CONTACT_SEED.key },
    { $set: CONTACT_SEED },
    { upsert: true, new: true },
  );
  console.log("Synced contact information");
}
