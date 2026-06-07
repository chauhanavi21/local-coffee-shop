import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
  { to: "/locations", label: "Visit" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const lightNav = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,padding,box-shadow] duration-300 ${
          scrolled || !isHome || mobileOpen
            ? "border-b border-espresso/5 bg-parchment/95 py-3 shadow-sm"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="page-shell flex items-center justify-between">
          <Link
            to="/"
            className={`font-display text-xl tracking-tight transition-colors md:text-2xl ${
              lightNav ? "text-parchment" : "text-espresso"
            }`}
          >
            Professor <span className="text-copper">Java&apos;s</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-all hover:after:w-full ${
                    lightNav
                      ? "text-crema/90 hover:text-parchment"
                      : "text-mocha hover:text-espresso"
                  } ${isActive ? "after:w-full !text-copper" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <>
                <Link
                  to="/order"
                  className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    lightNav ? "text-crema/90 hover:text-parchment" : "text-mocha hover:text-espresso"
                  }`}
                >
                  <ShoppingBag size={16} />
                  Order
                  {itemCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-copper px-1 text-[10px] font-semibold text-parchment">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    lightNav
                      ? "text-crema/90 hover:text-parchment"
                      : "text-mocha hover:text-espresso"
                  }`}
                >
                  <User size={14} />
                  {user.firstName}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  aria-label="Sign out"
                  className={`rounded-full p-2 transition-colors ${
                    lightNav ? "text-crema/80 hover:text-parchment" : "text-mocha/60 hover:text-copper"
                  }`}
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={`text-sm font-medium transition-colors ${
                    lightNav ? "text-crema/90 hover:text-parchment" : "text-mocha hover:text-espresso"
                  }`}
                >
                  Sign in
                </NavLink>
                <ButtonLink
                  to="/signup"
                  variant="secondary"
                  className="!px-4 !py-2 !text-xs"
                >
                  Join
                </ButtonLink>
              </>
            )}

            <ButtonLink
              to={user ? "/order" : "/login"}
              state={user ? undefined : { from: "/order" }}
              variant="primary"
              className="!px-5 !py-2.5 !text-xs"
            >
              Order ahead
            </ButtonLink>
          </nav>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-full p-2 transition-colors md:hidden ${
              lightNav ? "text-parchment" : "text-espresso"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-espresso/95 md:hidden">
          <nav className="flex h-full flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="font-display text-4xl text-parchment transition-colors hover:text-amber"
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link
                  to="/order"
                  className="font-display text-3xl text-parchment transition-colors hover:text-amber"
                >
                  Your order {itemCount > 0 && `(${itemCount})`}
                </Link>
                <Link
                  to="/profile"
                  className="font-display text-3xl text-parchment transition-colors hover:text-amber"
                >
                  My profile
                </Link>
                <p className="text-sm text-crema/70">Signed in as {user.firstName}</p>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm text-crema/70 hover:text-parchment"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="font-display text-3xl text-parchment transition-colors hover:text-amber"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="font-display text-3xl text-parchment transition-colors hover:text-amber"
                >
                  Create account
                </NavLink>
              </>
            )}
            <ButtonLink
              to={user ? "/order" : "/login"}
              state={user ? undefined : { from: "/order" }}
              variant="primary"
              className="mt-4"
            >
              Order ahead
            </ButtonLink>
          </nav>
        </div>
      )}
    </>
  );
}
