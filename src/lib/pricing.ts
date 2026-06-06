import type { OfferDTO } from "./api";
import type { CartLine } from "../context/CartContext";
import { linePrice } from "../context/CartContext";

export function computeDiscount(
  items: CartLine[],
  offers: OfferDTO[],
  orderCount: number,
): number {
  let discount = 0;
  const subtotal = items.reduce((s, l) => s + linePrice(l), 0);

  for (const offer of offers) {
    if (offer.id === "welcome-10" && offer.discountPercent && orderCount === 0) {
      discount += subtotal * (offer.discountPercent / 100);
    }

    if (
      offer.id === "pastry-friday" &&
      offer.discountPercent &&
      new Date().getDay() === (offer.dayOfWeek ?? 5)
    ) {
      const pastryTotal = items
        .filter((l) => l.item.category === "baked-goods")
        .reduce((s, l) => s + linePrice(l), 0);
      discount += pastryTotal * (offer.discountPercent / 100);
    }
  }

  return Math.min(discount, subtotal);
}
