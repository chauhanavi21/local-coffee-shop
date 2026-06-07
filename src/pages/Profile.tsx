import { useEffect, useState } from "react";
import {
  Banknote,
  CreditCard,
  Gift,
  Mail,
  Phone,
  ShoppingBag,
  Smartphone,
  Star,
} from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { ButtonLink } from "../components/ui/Button";
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
  const { user, offers } = useAuth();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getOrders()
      .then((data) => setOrders(data.orders))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

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
              ) : orders.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed border-espresso/15 bg-oat/50 p-10 text-center">
                  <p className="text-mocha/70">No orders yet.</p>
                  <ButtonLink to="/menu" variant="secondary" className="mt-4">
                    Browse the menu
                  </ButtonLink>
                </div>
              ) : (
                <ul className="mt-6 space-y-4">
                  {orders.map((order) => {
                    const PayIcon = paymentIcons[order.paymentMethod];
                    return (
                      <li
                        key={order.id}
                        className="rounded-2xl border border-espresso/10 bg-oat p-5 md:p-6"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-mono text-sm text-copper">
                              #{order.orderId}
                            </p>
                            <p className="mt-1 text-xs text-mocha/60">
                              {new Date(order.createdAt).toLocaleString()}
                              {order.pickupTime && ` · ${order.pickupTime}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-espresso">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1 text-xs text-mocha/60">
                              <PayIcon size={12} />
                              {paymentLabels[order.paymentMethod]}
                            </p>
                          </div>
                        </div>
                        <ul className="mt-4 space-y-1 border-t border-espresso/10 pt-4 text-sm text-mocha">
                          {order.items.map((line, i) => (
                            <li key={`${line.menuItemId}-${i}`}>
                              {line.quantity}× {line.name}
                              <span className="text-mocha/50">
                                {" "}
                                — ${line.lineTotal.toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {order.discount > 0 && (
                          <p className="mt-2 text-xs text-sage">
                            Saved ${order.discount.toFixed(2)} with offers
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
