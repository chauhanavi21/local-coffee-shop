export const PROMO_CODES = {
  JAVA10: {
    code: "JAVA10",
    label: "10% off your order",
    discountPercent: 10,
  },
  WOLFROAD: {
    code: "WOLFROAD",
    label: "$2 off",
    discountFlat: 2,
  },
  SANCTUARY: {
    code: "SANCTUARY",
    label: "5% off pickup orders",
    discountPercent: 5,
  },
};

export function findPromoCode(raw) {
  if (!raw?.trim()) return null;
  const key = raw.trim().toUpperCase();
  return PROMO_CODES[key] ?? null;
}
