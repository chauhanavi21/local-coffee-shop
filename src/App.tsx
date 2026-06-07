import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home })),
);
const Menu = lazy(() =>
  import("./pages/Menu").then((m) => ({ default: m.Menu })),
);
const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About })),
);
const Locations = lazy(() =>
  import("./pages/Locations").then((m) => ({ default: m.Locations })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((m) => ({ default: m.Contact })),
);
const OrderAhead = lazy(() =>
  import("./pages/OrderAhead").then((m) => ({ default: m.OrderAhead })),
);
const Checkout = lazy(() =>
  import("./pages/Checkout").then((m) => ({ default: m.Checkout })),
);
const Login = lazy(() =>
  import("./pages/Login").then((m) => ({ default: m.Login })),
);
const Signup = lazy(() =>
  import("./pages/Signup").then((m) => ({ default: m.Signup })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-oat border-t-copper" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route
                  path="order"
                  element={
                    <ProtectedRoute>
                      <OrderAhead />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="order/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route path="about" element={<About />} />
                <Route path="locations" element={<Locations />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </Suspense>
        </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
