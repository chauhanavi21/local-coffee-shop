export const PROMO_CODES = {
  JAVA10: { code: "JAVA10", label: "10% off your order", discountPercent: 10 },
  WOLFROAD: { code: "WOLFROAD", label: "$2 off", discountFlat: 2 },
  SANCTUARY: { code: "SANCTUARY", label: "5% off pickup orders", discountPercent: 5 },
} as const;

export type PromoCode = keyof typeof PROMO_CODES;

export interface AppliedPromo {
  code: string;
  label: string;
}

const STORAGE_KEY = "pj_applied_promo";

export function findPromoCode(raw: string) {
  const key = raw.trim().toUpperCase();
  return PROMO_CODES[key as PromoCode] ?? null;
}

export function promoDiscountAmount(subtotal: number, code: string): number {
  const promo = findPromoCode(code);
  if (!promo) return 0;
  if ("discountPercent" in promo && promo.discountPercent) {
    return subtotal * (promo.discountPercent / 100);
  }
  if ("discountFlat" in promo && promo.discountFlat) {
    return promo.discountFlat;
  }
  return 0;
}

export function saveAppliedPromo(promo: AppliedPromo) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(promo));
}

export function readAppliedPromo(): AppliedPromo | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AppliedPromo;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearAppliedPromo() {
  sessionStorage.removeItem(STORAGE_KEY);
}
