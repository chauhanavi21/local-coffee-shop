import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  api,
  setToken,
  type OfferDTO,
  type UserDTO,
} from "../lib/api";

interface AuthContextValue {
  user: UserDTO | null;
  offers: OfferDTO[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
  ) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [offers, setOffers] = useState<OfferDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("pj_token");
    if (!token) {
      setUser(null);
      setOffers([]);
      return;
    }
    const data = await api.me();
    setUser(data.user);
    setOffers(data.offers);
  }, []);

  useEffect(() => {
    refreshUser()
      .catch(() => {
        setToken(null);
        setUser(null);
        setOffers([]);
      })
      .finally(() => setLoading(false));
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const data = await api.login({ email, password });
    setToken(data.token);
    setUser(data.user);
    setOffers(data.offers);
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
  ) => {
    const data = await api.signup({ firstName, lastName, email, password, phone });
    setToken(data.token);
    setUser(data.user);
    setOffers(data.offers);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setOffers([]);
  };

  const deleteAccount = async () => {
    await api.deleteAccount("DELETE");
    setToken(null);
    setUser(null);
    setOffers([]);
  };

  return (
    <AuthContext.Provider
      value={{ user, offers, loading, login, signup, logout, deleteAccount, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
