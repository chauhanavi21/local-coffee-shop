import { useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Gift,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { SmartImage } from "../components/ui/SmartImage";
import {
  useCart,
  linePrice,
  lineLabel,
  type MilkOption,
  type SizeOption,
} from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { menuItems, menuCategories, type MenuCategory } from "../data/menu";
import { locations } from "../data/locations";
import { cafe } from "../data/cafe";
import type { MenuItem } from "../data/menu";

const pickupSlots = ["In 15 min", "In 30 min", "In 45 min", "In 1 hour"];

const milkOptions: { id: MilkOption; label: string }[] = [
  { id: "oat", label: "Oat" },
  { id: "whole", label: "Whole" },
  { id: "almond", label: "Almond" },
];

export function OrderAhead() {
  const { user, offers } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const [category, setCategory] = useState<MenuCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  const location = locations[0];

  const filtered = useMemo(() => {
    let items =
      category === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }
    return items;
  }, [category, search]);

  const handleQuickAdd = async (item: MenuItem) => {
    setAddingId(item.id);
    try {
      await cart.addItem(item, { quantity: 1 });
    } finally {
      setAddingId(null);
    }
  };

  return (
    <>
      <section className="border-b border-espresso/5 bg-espresso pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="page-shell">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              Order ahead
            </p>
            <h1 className="font-display text-4xl text-parchment md:text-6xl">
              Hi, {user?.firstName}
            </h1>
            <p className="mt-4 max-w-xl text-crema/70">
              Your personal order at {cafe.address.full}. Add from the menu below
              — items save to your account.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="page-shell py-10 md:py-14">
        {offers.length > 0 && (
          <Reveal className="mb-10">
            <div className="rounded-2xl border border-copper/20 bg-oat p-6">
              <div className="flex items-center gap-2">
                <Gift size={18} className="text-copper" />
                <h2 className="font-display text-xl text-espresso">Member offers</h2>
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {offers.map((offer) => (
                  <li
                    key={offer.id}
                    className="rounded-xl bg-parchment p-4 text-sm"
                  >
                    <p className="font-medium text-espresso">{offer.title}</p>
                    <p className="mt-1 text-mocha/70">{offer.description}</p>
                  </li>
                ))}
              </ul>
              {user && user.rewardsPoints > 0 && (
                <p className="mt-4 text-xs text-copper">
                  {user.rewardsPoints} reward points earned
                </p>
              )}
            </div>
          </Reveal>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-2xl text-espresso">Add to your order</h2>
              <div className="relative max-w-xs">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-mocha/40"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full rounded-full border border-espresso/10 bg-parchment py-2.5 pl-9 pr-4 text-sm outline-none focus:border-copper"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
                All
              </FilterChip>
              {menuCategories.map((cat) => (
                <FilterChip
                  key={cat.id}
                  active={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </FilterChip>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {filtered.map((item) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  expanded={expandedId === item.id}
                  adding={addingId === item.id}
                  onToggle={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                  onQuickAdd={() => handleQuickAdd(item)}
                  onAdd={async (opts) => {
                    setAddingId(item.id);
                    try {
                      await cart.addItem(item, opts);
                      setExpandedId(null);
                    } finally {
                      setAddingId(null);
                    }
                  }}
                />
              ))}
            </div>

            <p className="mt-6 text-sm text-mocha/60">
              Browse the full{" "}
              <Link to="/menu" className="text-copper hover:underline">
                menu page
              </Link>{" "}
              to add items too.
            </p>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <CartPanel
              location={location}
              onCheckout={() => navigate("/order/checkout")}
            />
          </aside>
        </div>
      </div>
    </>
  );
}

function CartPanel({
  location,
  onCheckout,
}: {
  location: (typeof locations)[0];
  onCheckout: () => void;
}) {
  const { user } = useAuth();
  const cart = useCart();

  return (
    <div className="rounded-2xl border border-espresso/10 bg-oat p-6 md:p-8">
      <div className="flex items-center gap-3">
        <ShoppingBag size={20} className="text-copper" />
        <h2 className="font-display text-2xl text-espresso">Your order</h2>
        {cart.itemCount > 0 && (
          <span className="ml-auto rounded-full bg-copper px-2.5 py-0.5 text-xs font-medium text-parchment">
            {cart.itemCount}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-parchment p-3 text-sm">
        <MapPin size={16} className="mt-0.5 shrink-0 text-copper" />
        <div>
          <p className="font-medium text-espresso">{location.name}</p>
          <p className="text-mocha/60">{location.address}</p>
          <p className="mt-1 text-xs text-mocha/50">{user?.email}</p>
        </div>
      </div>

      {cart.loading ? (
        <p className="mt-8 text-center text-sm text-mocha/60">Loading your order...</p>
      ) : cart.items.length === 0 ? (
        <p className="mt-8 text-center text-sm text-mocha/60">
          Your order is empty. Add items from the menu.
        </p>
      ) : (
        <ul className="mt-6 max-h-64 space-y-4 overflow-y-auto pr-1">
          {cart.items.map((line) => (
            <li
              key={line.key}
              className="flex gap-3 border-b border-espresso/5 pb-4 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-espresso">{lineLabel(line)}</p>
                <p className="text-xs text-mocha/60">
                  {line.size === "large" ? "Large" : "Regular"}
                  {(line.item.category === "coffee" ||
                    line.item.category === "tea") &&
                    ` · ${milkOptions.find((m) => m.id === line.milk)?.label ?? line.milk}`}
                  {line.notes && ` · ${line.notes}`}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => cart.updateQuantity(line.key, line.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-espresso/10 text-mocha hover:bg-parchment"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center text-sm font-medium">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => cart.updateQuantity(line.key, line.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-espresso/10 text-mocha hover:bg-parchment"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => cart.removeItem(line.key)}
                    className="ml-auto text-mocha/40 hover:text-copper"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="shrink-0 font-medium text-copper">
                ${linePrice(line).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 space-y-4 border-t border-espresso/10 pt-6">
        <div>
          <label
            htmlFor="pickup-time"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-mocha/60"
          >
            Pickup time
          </label>
          <div className="relative">
            <select
              id="pickup-time"
              value={cart.checkout.pickupTime}
              onChange={(e) => cart.setCheckout({ pickupTime: e.target.value })}
              className="w-full appearance-none rounded-xl border border-espresso/10 bg-parchment px-4 py-3 pr-10 text-sm outline-none focus:border-copper"
            >
              {pickupSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mocha/40"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between text-mocha/70">
          <span>Subtotal</span>
          <span>${cart.subtotal.toFixed(2)}</span>
        </div>
        {cart.discount > 0 && (
          <div className="flex justify-between text-sage">
            <span>Member savings</span>
            <span>-${cart.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-mocha/70">
          <span>Tax</span>
          <span>${cart.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-espresso/10 pt-2 font-medium text-espresso">
          <span>Total</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        disabled={cart.items.length === 0}
        onClick={onCheckout}
      >
        Continue to payment · ${cart.total.toFixed(2)}
      </Button>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
        active ? "bg-espresso text-parchment" : "bg-oat text-mocha hover:bg-crema"
      }`}
    >
      {children}
    </button>
  );
}

function MenuRow({
  item,
  expanded,
  adding,
  onToggle,
  onQuickAdd,
  onAdd,
}: {
  item: MenuItem;
  expanded: boolean;
  adding: boolean;
  onToggle: () => void;
  onQuickAdd: () => void;
  onAdd: (opts: {
    size: SizeOption;
    milk: MilkOption;
    notes?: string;
  }) => Promise<void>;
}) {
  const isDrink = item.category === "coffee" || item.category === "tea";
  const [size, setSize] = useState<SizeOption>("regular");
  const [milk, setMilk] = useState<MilkOption>("oat");
  const [itemNotes, setItemNotes] = useState("");

  const displayPrice = item.price + (size === "large" && isDrink ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-xl border border-espresso/10 bg-parchment">
      <div className="flex items-center gap-3 p-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <SmartImage src={item.image} alt={item.name} sizes="56px" className="h-full w-full" />
        </div>
        <button type="button" onClick={onToggle} className="min-w-0 flex-1 text-left">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-espresso">{item.name}</p>
            <span className="shrink-0 text-sm font-medium text-copper">
              ${item.price.toFixed(2)}
              {isDrink && "+"}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-mocha/60">{item.description}</p>
        </button>
        <button
          type="button"
          aria-label={`Add ${item.name}`}
          disabled={adding}
          onClick={onQuickAdd}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper text-parchment transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Plus size={18} />
        </button>
      </div>

      {expanded && (
        <div className="border-t border-espresso/5 bg-oat/50 px-4 pb-4 pt-3">
          {isDrink && (
            <>
              <div className="mb-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-mocha/60">Size</p>
                <div className="flex gap-2">
                  {(["regular", "large"] as SizeOption[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize ${
                        size === s ? "bg-espresso text-parchment" : "bg-parchment text-mocha"
                      }`}
                    >
                      {s}{s === "large" && " +$1"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-mocha/60">Milk</p>
                <div className="flex flex-wrap gap-2">
                  {milkOptions.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilk(m.id)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                        milk === m.id ? "bg-espresso text-parchment" : "bg-parchment text-mocha"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <input
            value={itemNotes}
            onChange={(e) => setItemNotes(e.target.value)}
            placeholder="Special instructions..."
            className="mb-4 w-full rounded-xl border border-espresso/10 bg-parchment px-3 py-2 text-sm outline-none focus:border-copper"
          />
          <Button
            disabled={adding}
            onClick={() =>
              onAdd({
                size,
                milk: isDrink ? milk : "none",
                notes: itemNotes || undefined,
              })
            }
          >
            Add with options · ${displayPrice.toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
}
