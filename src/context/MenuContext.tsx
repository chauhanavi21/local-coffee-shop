import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "../lib/api";
import type {
  MenuCategoryOption,
  MenuItem,
  RetailBean,
} from "../types/menu";

interface MenuContextValue {
  items: MenuItem[];
  categories: MenuCategoryOption[];
  retailBeans: RetailBean[];
  featured: MenuItem[];
  loading: boolean;
  error: string | null;
  getItemById: (id: string) => MenuItem | undefined;
  refreshMenu: () => Promise<void>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategoryOption[]>([]);
  const [retailBeans, setRetailBeans] = useState<RetailBean[]>([]);
  const [featured, setFeatured] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMenu();
      setItems(data.items as MenuItem[]);
      setCategories(data.categories as MenuCategoryOption[]);
      setRetailBeans(data.retailBeans);
      setFeatured(data.featured as MenuItem[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load menu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMenu().catch(console.error);
  }, [refreshMenu]);

  const getItemById = useCallback(
    (id: string) => items.find((item) => item.id === id),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      categories,
      retailBeans,
      featured,
      loading,
      error,
      getItemById,
      refreshMenu,
    }),
    [items, categories, retailBeans, featured, loading, error, getItemById, refreshMenu],
  );

  return (
    <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
