const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getToken() {
  return localStorage.getItem("pj_token");
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem("pj_token", token);
  else localStorage.removeItem("pj_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || "Request failed", res.status);
  }
  return data as T;
}

export const api = {
  signup: (body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) =>
    request<{ token: string; user: UserDTO; offers: OfferDTO[] }>(
      "/auth/signup",
      { method: "POST", body: JSON.stringify(body) },
    ),

  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: UserDTO; offers: OfferDTO[] }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify(body) },
    ),

  me: () =>
    request<{ user: UserDTO; offers: OfferDTO[]; cart: CartDTO }>(
      "/auth/me",
    ),

  deleteAccount: (confirm = "DELETE") =>
    request<{ ok: boolean }>("/auth/me", {
      method: "DELETE",
      body: JSON.stringify({ confirm }),
    }),

  getCart: () => request<{ cart: CartDTO }>("/cart"),

  addCartItem: (body: {
    menuItemId: string;
    size?: string;
    milk?: string;
    notes?: string;
    quantity?: number;
  }) =>
    request<{ cart: CartDTO }>("/cart/items", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateCartQuantity: (key: string, quantity: number) =>
    request<{ cart: CartDTO }>(`/cart/items/${encodeURIComponent(key)}/quantity`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  removeCartItem: (key: string) =>
    request<{ cart: CartDTO }>(`/cart/items/${encodeURIComponent(key)}`, {
      method: "DELETE",
    }),

  updateCheckout: (body: { pickupTime?: string; orderNotes?: string }) =>
    request<{ cart: CartDTO }>("/cart/checkout", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  validatePromo: (code: string) =>
    request<{ promo: { code: string; label: string; discountPercent?: number; discountFlat?: number } }>(
      "/cart/promo/validate",
      { method: "POST", body: JSON.stringify({ code }) },
    ),

  completeOrder: (body: {
    paymentMethod: "card" | "cash" | "apple_pay";
    appliedOffers?: string[];
    promoCode?: string;
  }) =>
    request<{ order: OrderDTO; user: UserDTO; cart: CartDTO }>("/cart/complete", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getOrders: () => request<{ orders: OrderDTO[] }>("/orders"),

  getOffers: () => request<{ offers: OfferDTO[] }>("/offers"),

  getMenu: () =>
    request<{
      categories: { id: string; label: string }[];
      items: MenuItemDTO[];
      retailBeans: { name: string; price: number; note: string }[];
      featured: MenuItemDTO[];
    }>("/menu"),

  getContact: () => request<{ contact: ContactInfoDTO }>("/contact"),

  submitContactMessage: (body: ContactMessageInput) =>
    request<{ ok: boolean; message: { id: string; createdAt: string } }>(
      "/contact/messages",
      { method: "POST", body: JSON.stringify(body) },
    ),

  health: () => request<{ ok: boolean; db: boolean }>("/health"),
};

export interface MenuItemDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  featured?: boolean;
}

export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  memberSince: string;
  rewardsPoints: number;
  orderCount: number;
  activeOffers: string[];
}

export interface OrderLineDTO {
  menuItemId: string;
  name: string;
  quantity: number;
  size: string;
  milk: string;
  notes?: string;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderDTO {
  id: string;
  orderId: string;
  items: OrderLineDTO[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: "card" | "cash" | "apple_pay";
  appliedOffers: string[];
  promoCode?: string;
  pickupTime: string;
  orderNotes?: string;
  status: string;
  createdAt: string;
}

export interface OfferDTO {
  id: string;
  title: string;
  description: string;
  discountPercent?: number;
  discountType?: string;
  firstOrderOnly?: boolean;
  dayOfWeek?: number;
  categories?: string[];
}

export interface CartItemDTO {
  key: string;
  menuItemId: string;
  quantity: number;
  size: "regular" | "large";
  milk: "whole" | "oat" | "almond" | "none";
  notes?: string;
}

export interface CartDTO {
  items: CartItemDTO[];
  checkout: {
    pickupTime: string;
    orderNotes: string;
  };
}

export interface ContactSectionDTO {
  id: string;
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface ContactInfoDTO {
  businessName: string;
  shortName: string;
  tagline: string;
  description: string;
  hero: {
    eyebrow: string;
    title: string;
    image: string;
  };
  form: {
    title: string;
    description: string;
  };
  address: {
    street: string;
    place: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  website: string;
  facebook: string;
  hours: {
    weekday: string;
    sunday: string;
    summary: string;
  };
  mapQuery: string;
  sections: ContactSectionDTO[];
}

export interface ContactMessageInput {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}
