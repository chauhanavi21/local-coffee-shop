export type MenuCategory =
  | "coffee"
  | "tea"
  | "breakfast"
  | "baked-goods"
  | "lunch";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tag?: string;
  featured?: boolean;
}

export interface RetailBean {
  name: string;
  price: number;
  note: string;
}

export interface MenuCategoryOption {
  id: MenuCategory;
  label: string;
}
