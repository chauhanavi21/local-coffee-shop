/** Verified business info — Professor Java's Coffee Sanctuary, Albany NY */
export const cafe = {
  name: "Professor Java's Coffee Sanctuary",
  shortName: "Professor Java's",
  tagline: "We create food, you enjoy it.",
  description:
    "Albany's coffee sanctuary — fresh-roasted beans, house-baked treats, breakfast all day, and sandwiches made with care on Wolf Road.",
  address: {
    street: "145 Wolf Rd",
    place: "Shoppers Park",
    city: "Albany",
    state: "NY",
    zip: "12205",
    full: "145 Wolf Rd, Shoppers Park, Albany, NY 12205",
  },
  phone: "(518) 435-0843",
  phoneHref: "tel:5184350843",
  website: "https://professorjavas.com",
  facebook: "https://www.facebook.com/ProfessorJavasCafe/",
  hours: {
    weekday: "Mon–Sat 7:00 AM – 9:00 PM",
    sunday: "Sun 7:00 AM – 7:00 PM",
    summary: "Mon–Sat 7am–9pm · Sun 7am–7pm",
  },
  /** Menu prices sourced from Grubhub / official ordering (2025–2026) */
  menuSource: "Menu & prices reflect in-store and Grubhub listings.",
} as const;
