import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Banknote,
  CreditCard,
  Gift,
  Mail,
  Phone,
  ShoppingBag,
  Smartphone,
  Star,
  Trash2,
} from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { ButtonLink } from "../components/ui/Button";
import { PaymentCelebration } from "../components/order/PaymentCelebration";
import { useAuth } from "../context/AuthContext";
import { api, type OrderDTO } from "../lib/api";

const paymentIcons = {
  card: CreditCard,
  cash: Banknote,
  apple_pay: Smartphone,
} as const;

const paymentLabels = {
  card: "Card",
  cash: "Cash",
  apple_pay: "Apple Pay",
} as const;

export function Profile() {
  const { user, offers, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getOrders();
      setOrders(data.orders);
    } catch (err) {
        console.error(err);
      setError("Could not load your order history. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (!user) return null;

  const canDelete = deleteConfirm.trim().toUpperCase() === "DELETE";

  const handleDeleteAccount = async () => {
    if (!canDelete || deleting) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteAccount();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setDeleteError("Could not delete your account. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="border-b border-espresso/5 bg-espresso pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="page-shell">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              Your account
            </p>
            <h1 className="font-display text-4xl text-parchment md:text-5xl">
              {user.firstName}&apos;s profile
            </h1>
            <p className="mt-3 text-crema/70">
              Member since{" "}
              {new Date(user.memberSince).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="page-shell py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-2xl border border-espresso/10 bg-oat p-6">
                <h2 className="font-display text-xl text-espresso">Details</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-mocha">
                    <Mail size={14} className="text-copper" />
                    {user.email}
                  </li>
                  {user.phone ? (
                    <li className="flex items-center gap-2 text-mocha">
                      <Phone size={14} className="text-copper" />
                      {user.phone}
                    </li>
                  ) : (
                    <li className="text-xs text-mocha/50">
                      No phone on file — add one when creating a new account
                    </li>
                  )}
                  <li className="flex items-center gap-2 text-mocha">
                    <Star size={14} className="text-copper" />
                    {user.rewardsPoints} reward points · {user.orderCount} orders
                  </li>
                </ul>
                <ButtonLink to="/order" className="mt-6 w-full">
                  <ShoppingBag size={16} />
                  Order ahead
                </ButtonLink>
              </div>
            </Reveal>

            {offers.length > 0 && (
              <Reveal delay={50}>
                <div className="rounded-2xl border border-copper/20 bg-oat p-6">
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="text-copper" />
                    <h2 className="font-display text-lg text-espresso">
                      Active offers
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {offers.map((offer) => (
                      <li
                        key={offer.id}
                        className="rounded-xl bg-parchment p-3 text-sm"
                      >
                        <p className="font-medium text-espresso">{offer.title}</p>
                        <p className="mt-1 text-xs text-mocha/70">
                          {offer.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-mocha/50">
                    Attach offers at checkout before you pay.
                  </p>
                </div>
              </Reveal>
            )}

            <Reveal delay={80}>
              <div className="rounded-2xl border border-red-200 bg-red-50/70 p-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-700" />
                  <h2 className="font-display text-lg text-red-950">
                    Delete account
                  </h2>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-red-900/70">
                  This permanently deletes your profile, cart, and saved order
                  history. Type DELETE to confirm.
                </p>
                <input
                  value={deleteConfirm}
                  onChange={(e) => {
                    setDeleteConfirm(e.target.value);
                    setDeleteError("");
                  }}
                  placeholder="Type DELETE"
                  className="mt-4 w-full rounded-xl border border-red-200 bg-parchment px-4 py-2.5 text-sm outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
                />
                {deleteError && (
                  <p className="mt-2 text-xs text-red-700">{deleteError}</p>
                )}
                <button
                  type="button"
                  disabled={!canDelete || deleting}
                  onClick={handleDeleteAccount}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  {deleting ? "Deleting..." : "Delete my account"}
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={100}>
              <h2 className="font-display text-2xl text-espresso">
                Order history
              </h2>
              <p className="mt-1 text-sm text-mocha/60">
                Paid orders saved after successful checkout.
              </p>

              {loading ? (
                <div className="mt-8 flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-oat border-t-copper" />
                </div>
              ) : error ? (
                <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    type="button"
                    onClick={loadOrders}
                    className="mt-4 rounded-full bg-espresso px-5 py-2 text-xs font-semibold text-parchment transition-transform hover:-translate-y-0.5"
                  >
                    Retry order history
                  </button>
                </div>
              ) : orders.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed border-espresso/15 bg-oat/50 p-10 text-center">
                  <p className="text-mocha/70">No orders yet.</p>
                  <ButtonLink to="/order" variant="secondary" className="mt-4">
                    Start an order
                  </ButtonLink>
                </div>
              ) : (
                <ul className="mt-6 space-y-4">
                  {orders.map((order, index) => {
                    const paymentMethod = order.paymentMethod ?? "card";
                    const PayIcon = paymentIcons[paymentMethod] ?? CreditCard;
                    return (
                      <li
                        key={order.id}
                        className="relative overflow-hidden rounded-2xl border border-espresso/10 bg-oat p-5 shadow-[0_16px_50px_rgba(26,18,9,0.05)] transition-transform duration-300 hover:-translate-y-0.5 md:p-6"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-mono text-sm text-copper">
                                #{order.orderId}
                              </p>
                              <span className="rounded-full bg-sage/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sage">
                                Paid
                              </span>
                              {index === 0 && (
                                <span className="rounded-full bg-copper/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-copper">
                                  Just completed
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-mocha/60">
                              {new Date(order.createdAt).toLocaleString()}
                              {order.pickupTime && ` · ${order.pickupTime}`}
                            </p>
                          </div>
                          <div className="flex items-start gap-2 text-right">
                            {index === 0 && (
                              <div className="pointer-events-none -mt-3 h-12 w-12 shrink-0 overflow-visible">
                                <PaymentCelebration size="sm" />
                              </div>
                            )}
                            <div>
                            <p className="font-medium text-espresso">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1 text-xs text-mocha/60">
                              <PayIcon size={12} />
                              {paymentLabels[paymentMethod] ?? "Card"}
                            </p>
                            </div>
                          </div>
                        </div>
                        <ul className="mt-4 space-y-1 border-t border-espresso/10 pt-4 text-sm text-mocha">
                          {order.items.map((line, i) => (
                            <li key={`${line.menuItemId}-${i}`}>
                              <span>
                                {line.quantity}× {line.name}
                              </span>
                              <span className="text-mocha/50">
                                {" "}
                                ({line.size}
                                {line.milk && line.milk !== "none"
                                  ? ` · ${line.milk}`
                                  : ""}
                                {line.notes ? ` · ${line.notes}` : ""}) — $
                                {line.lineTotal.toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {order.discount > 0 && (
                          <p className="mt-2 text-xs text-sage">
                            Saved ${order.discount.toFixed(2)}
                            {order.promoCode
                              ? ` with promo ${order.promoCode}`
                              : " with offers"}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
