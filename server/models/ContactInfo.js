import mongoose from "mongoose";

const contactSectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    icon: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    href: { type: String, default: "" },
  },
  { _id: false },
);

const contactInfoSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    businessName: { type: String, required: true },
    shortName: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    heroEyebrow: { type: String, default: "Contact" },
    heroTitle: { type: String, required: true },
    heroImage: { type: String, default: "/images/contact.jpg" },
    formTitle: { type: String, default: "Send a message" },
    formDescription: { type: String, default: "" },
    address: {
      street: String,
      place: String,
      city: String,
      state: String,
      zip: String,
      full: String,
    },
    phone: { type: String, required: true },
    phoneHref: { type: String, required: true },
    email: { type: String, default: "" },
    emailHref: { type: String, default: "" },
    website: { type: String, default: "" },
    facebook: { type: String, default: "" },
    hours: {
      weekday: String,
      sunday: String,
      summary: String,
    },
    mapQuery: { type: String, default: "" },
    sections: { type: [contactSectionSchema], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
