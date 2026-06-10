import { Router } from "express";
import { ContactInfo } from "../models/ContactInfo.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { validateContactMessageBody } from "../lib/contactValidation.js";

const router = Router();

function serializeContactInfo(doc) {
  return {
    businessName: doc.businessName,
    shortName: doc.shortName,
    tagline: doc.tagline,
    description: doc.description,
    hero: {
      eyebrow: doc.heroEyebrow,
      title: doc.heroTitle,
      image: doc.heroImage,
    },
    form: {
      title: doc.formTitle,
      description: doc.formDescription,
    },
    address: doc.address,
    phone: doc.phone,
    phoneHref: doc.phoneHref,
    email: doc.email,
    emailHref: doc.emailHref,
    website: doc.website,
    facebook: doc.facebook,
    hours: doc.hours,
    mapQuery: doc.mapQuery,
    sections: doc.sections.map((section) => ({
      id: section.id,
      icon: section.icon,
      label: section.label,
      value: section.value,
      href: section.href || undefined,
    })),
  };
}

router.get("/", async (_req, res) => {
  try {
    const contact = await ContactInfo.findOne({ key: "main", active: true });
    if (!contact) {
      return res.status(404).json({ error: "Contact information not found" });
    }

    res.json({ contact: serializeContactInfo(contact) });
  } catch (err) {
    console.error("Contact fetch error:", err);
    res.status(500).json({ error: "Could not load contact information" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const parsed = validateContactMessageBody(req.body);
    if (!parsed.ok) {
      return res.status(400).json({ error: parsed.error });
    }

    const message = await ContactMessage.create(parsed.data);

    res.status(201).json({
      ok: true,
      message: {
        id: message._id.toString(),
        createdAt: message.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("Contact message error:", err);
    res.status(500).json({ error: "Could not send message" });
  }
});

export default router;
