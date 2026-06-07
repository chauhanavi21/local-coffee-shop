import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, type CartDTO, type CartItemDTO } from "../lib/api";
import type { MenuItem } from "../types/menu";
import { useAuth } from "./AuthContext";
import { useMenu } from "./MenuContext";
import { computeDiscount } from "../lib/pricing";

export type MilkOption = "whole" | "oat" | "almond" | "none";
export type SizeOption = "regular" | "large";

export interface CartLine extends CartItemDTO {
  item: MenuItem;
}

const TAX_RATE = 0.08875;

interface CartContextValue {
  items: CartLine[];
  checkout: CartDTO["checkout"];
  loading: boolean;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
  refreshCart: () => Promise<void>;
  addItem: (
    item: MenuItem,
    options?: {
      size?: SizeOption;
      milk?: MilkOption;
      notes?: string;
      quantity?: number;
    },
  ) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  setCheckout: (patch: Partial<CartDTO["checkout"]>) => Promise<void>;
  completeOrder: (body: {
    paymentMethod: "card" | "cash" | "apple_pay";
    appliedOffers?: string[];
  }) => Promise<import("../lib/api").OrderDTO>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function linePrice(line: CartLine): number {
  const isDrink =
    line.item.category === "coffee" || line.item.category === "tea";
  const sizeExtra = line.size === "large" && isDrink ? 1 : 0;
  return (line.item.price + sizeExtra) * line.quantity;
}

export function lineLabel(line: CartLine): string {
  return line.item.name;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, offers, refreshUser } = useAuth();
  const { getItemById } = useMenu();

  const hydrateItems = useCallback(
    (dto: CartItemDTO[]): CartLine[] =>
      dto
        .map((row) => {
          const item = getItemById(row.menuItemId);
          if (!item) return null;
          return { ...row, item };
        })
        .filter(Boolean) as CartLine[],
    [getItemById],
  );
  const [items, setItems] = useState<CartLine[]>([]);
  const [rawCart, setRawCart] = useState<CartDTO | null>(null);
  const [checkout, setCheckoutState] = useState<CartDTO["checkout"]>({
    pickupTime: "In 30 min",
    orderNotes: "",
  });
  const [loading, setLoading] = useState(false);

  const applyCart = (cart: CartDTO) => {
    setRawCart(cart);
    setItems(hydrateItems(cart.items));
    setCheckoutState(cart.checkout);
  };

  useEffect(() => {
    if (rawCart) {
      setItems(hydrateItems(rawCart.items));
    }
  }, [rawCart, hydrateItems]);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await api.getCart();
      applyCart(data.cart);
    } finally {
      setLoading(false);
    }
  }, [user, hydrateItems]);

  useEffect(() => {
    if (user) {
      refreshCart().catch(console.error);
    } else {
      setItems([]);
      setCheckoutState({ pickupTime: "In 30 min", orderNotes: "" });
    }
  }, [user, refreshCart]);

  const addItem = async (
    item: MenuItem,
    options?: {
      size?: SizeOption;
      milk?: MilkOption;
      notes?: string;
      quantity?: number;
    },
  ) => {
    const data = await api.addCartItem({
      menuItemId: item.id,
      size: options?.size ?? "regular",
      milk: options?.milk ?? (item.category === "coffee" || item.category === "tea" ? "whole" : "none"),
      notes: options?.notes ?? "",
      quantity: options?.quantity ?? 1,
    });
    applyCart(data.cart);
  };

  const updateQuantity = async (key: string, quantity: number) => {
    const data = await api.updateCartQuantity(key, quantity);
    applyCart(data.cart);
  };

  const removeItem = async (key: string) => {
    const data = await api.removeCartItem(key);
    applyCart(data.cart);
  };

  const setCheckout = async (patch: Partial<CartDTO["checkout"]>) => {
    const data = await api.updateCheckout(patch);
    applyCart(data.cart);
  };

  const completeOrder = async (body: {
    paymentMethod: "card" | "cash" | "apple_pay";
    appliedOffers?: string[];
  }) => {
    const data = await api.completeOrder(body);
    await refreshUser();
    await refreshCart();
    return data.order;
  };

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + linePrice(line), 0),
    [items],
  );

  const discount = useMemo(
    () =>
      user ? computeDiscount(items, offers, user.orderCount, []) : 0,
    [items, offers, user],
  );

  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * TAX_RATE;
  const total = taxable + tax;

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        checkout,
        loading,
        subtotal,
        discount,
        tax,
        total,
        itemCount,
        refreshCart,
        addItem,
        updateQuantity,
        removeItem,
        setCheckout,
        completeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
