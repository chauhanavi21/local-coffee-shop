import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { menuItems, type MenuItem } from "../data/menu";
import { api, type CartDTO, type CartItemDTO } from "../lib/api";
import { useAuth } from "./AuthContext";
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
  completeOrder: () => Promise<void>;
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

function hydrateItems(dto: CartItemDTO[]): CartLine[] {
  return dto
    .map((row) => {
      const item = menuItems.find((m) => m.id === row.menuItemId);
      if (!item) return null;
      return { ...row, item };
    })
    .filter(Boolean) as CartLine[];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, offers, refreshUser } = useAuth();
  const [items, setItems] = useState<CartLine[]>([]);
  const [checkout, setCheckoutState] = useState<CartDTO["checkout"]>({
    pickupTime: "In 30 min",
    orderNotes: "",
  });
  const [loading, setLoading] = useState(false);

  const applyCart = (cart: CartDTO) => {
    setItems(hydrateItems(cart.items));
    setCheckoutState(cart.checkout);
  };

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
  }, [user]);

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

  const completeOrder = async () => {
    await api.completeOrder();
    await refreshUser();
    await refreshCart();
  };

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + linePrice(line), 0),
    [items],
  );

  const discount = useMemo(
    () =>
      user
        ? computeDiscount(items, offers, user.orderCount)
        : 0,
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
