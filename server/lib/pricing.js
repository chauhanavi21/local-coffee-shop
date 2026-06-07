import { MEMBER_OFFERS } from "../data/offers.js";
import { findPromoCode } from "../data/promoCodes.js";

const TAX_RATE = 0.08875;

export function lineUnitPrice(menuItem, size) {
  const isDrink = menuItem.category === "coffee" || menuItem.category === "tea";
  const sizeExtra = size === "large" && isDrink ? 1 : 0;
  return menuItem.price + sizeExtra;
}

export function computeSubtotal(cartItems, menuById) {
  return cartItems.reduce((sum, row) => {
    const menuItem = menuById.get(row.menuItemId);
    if (!menuItem) return sum;
    return sum + lineUnitPrice(menuItem, row.size) * row.quantity;
  }, 0);
}

function promoDiscount(subtotal, promoCode) {
  const promo = findPromoCode(promoCode);
  if (!promo) return 0;
  if (promo.discountPercent) return subtotal * (promo.discountPercent / 100);
  if (promo.discountFlat) return promo.discountFlat;
  return 0;
}

export function computeDiscount(
  cartItems,
  menuById,
  orderCount,
  selectedOfferIds = [],
  promoCode = "",
) {
  const offers = MEMBER_OFFERS.filter((o) => selectedOfferIds.includes(o.id));
  let discount = 0;
  const subtotal = computeSubtotal(cartItems, menuById);

  for (const offer of offers) {
    if (offer.id === "welcome-10" && offer.discountPercent && orderCount === 0) {
      discount += subtotal * (offer.discountPercent / 100);
    }

    if (
      offer.id === "pastry-friday" &&
      offer.discountPercent &&
      new Date().getDay() === (offer.dayOfWeek ?? 5)
    ) {
      const pastryTotal = cartItems.reduce((sum, row) => {
        const menuItem = menuById.get(row.menuItemId);
        if (!menuItem || menuItem.category !== "baked-goods") return sum;
        return sum + lineUnitPrice(menuItem, row.size) * row.quantity;
      }, 0);
      discount += pastryTotal * (offer.discountPercent / 100);
    }

    if (offer.id === "free-upgrade" && offer.discountType === "free-upgrade") {
      const drinkDiscount = cartItems.reduce((sum, row) => {
        const menuItem = menuById.get(row.menuItemId);
        if (!menuItem) return sum;
        const isDrink = menuItem.category === "coffee" || menuItem.category === "tea";
        if (!isDrink) return sum;
        return sum + row.quantity;
      }, 0);
      discount += drinkDiscount;
    }
  }

  discount += promoDiscount(subtotal, promoCode);
  return Math.min(discount, subtotal);
}

export function computeTotals(
  cartItems,
  menuById,
  orderCount,
  selectedOfferIds,
  promoCode = "",
) {
  const subtotal = computeSubtotal(cartItems, menuById);
  const discount = computeDiscount(
    cartItems,
    menuById,
    orderCount,
    selectedOfferIds,
    promoCode,
  );
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * TAX_RATE;
  const total = taxable + tax;
  return { subtotal, discount, tax, total };
}

export { TAX_RATE };
