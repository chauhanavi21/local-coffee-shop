import type { OfferDTO } from "./api";
import type { CartLine } from "../context/CartContext";
import { linePrice } from "../context/CartContext";

export function isOfferEligible(
  offer: OfferDTO,
  orderCount: number,
): boolean {
  if (offer.firstOrderOnly && orderCount > 0) return false;
  if (offer.dayOfWeek !== undefined && new Date().getDay() !== offer.dayOfWeek) {
    return false;
  }
  return true;
}

export function computeDiscount(
  items: CartLine[],
  offers: OfferDTO[],
  orderCount: number,
  selectedOfferIds: string[] = [],
): number {
  let discount = 0;
  const subtotal = items.reduce((s, l) => s + linePrice(l), 0);
  const selected = offers.filter(
    (o) => selectedOfferIds.includes(o.id) && isOfferEligible(o, orderCount),
  );

  for (const offer of selected) {
    if (offer.id === "welcome-10" && offer.discountPercent) {
      discount += subtotal * (offer.discountPercent / 100);
    }

    if (offer.id === "pastry-friday" && offer.discountPercent) {
      const pastryTotal = items
        .filter((l) => l.item.category === "baked-goods")
        .reduce((s, l) => s + linePrice(l), 0);
      discount += pastryTotal * (offer.discountPercent / 100);
    }

    if (offer.id === "free-upgrade" && offer.discountType === "free-upgrade") {
      const drinkDiscount = items
        .filter(
          (l) => l.item.category === "coffee" || l.item.category === "tea",
        )
        .reduce((s, l) => s + l.quantity, 0);
      discount += drinkDiscount;
    }
  }

  return Math.min(discount, subtotal);
}
