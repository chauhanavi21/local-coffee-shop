export const MEMBER_OFFERS = [
  {
    id: "welcome-10",
    title: "10% off your first order",
    description: "New member welcome — select it at checkout before you pay.",
    discountPercent: 10,
    firstOrderOnly: true,
  },
  {
    id: "free-upgrade",
    title: "Free size upgrade",
    description: "Members get a free large upgrade on any coffee or tea drink.",
    discountType: "free-upgrade",
  },
  {
    id: "pastry-friday",
    title: "Pastry perk",
    description: "15% off baked goods every Friday for members.",
    discountPercent: 15,
    dayOfWeek: 5,
    categories: ["baked-goods"],
  },
];
