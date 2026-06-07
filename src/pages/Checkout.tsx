import { useMemo, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Gift,
  Lock,
  MapPin,
  Shield,
  Smartphone,
} from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import {
  useCart,
  linePrice,
  lineLabel,
} from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { locations } from "../data/locations";
import { cafe } from "../data/cafe";
import { computeDiscount, isOfferEligible } from "../lib/pricing";
import type { OrderDTO } from "../lib/api";

const TAX_RATE = 0.08875;

type PaymentMethod = "card" | "cash" | "apple_pay";

const paymentLabels: Record<PaymentMethod, string> = {
  card: "Card",
  cash: "Cash",
  apple_pay: "Apple Pay",
};

export function Checkout() {
  const { user, offers } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const location = locations[0];

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [savedOrder, setSavedOrder] = useState<OrderDTO | null>(null);

  const eligibleOffers = useMemo(
    () => offers.filter((o) => isOfferEligible(o, user?.orderCount ?? 0)),
    [offers, user?.orderCount],
  );

  const discount = useMemo(
    () =>
      user
        ? computeDiscount(cart.items, offers, user.orderCount, selectedOffers)
        : 0,
    [cart.items, offers, user, selectedOffers],
  );

  const taxable = Math.max(0, cart.subtotal - discount);
  const tax = taxable * TAX_RATE;
  const total = taxable + tax;

  if (cart.items.length === 0 && !paid) {
    return <Navigate to="/order" replace />;
  }

  const formatCard = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const toggleOffer = (id: string) => {
    setSelectedOffers((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id],
    );
  };

  const cardValid =
    cardName.trim() &&
    cardNumber.replace(/\s/g, "").length >= 16 &&
    expiry.length >= 5 &&
    cvc.length >= 3;

  const canPay =
    paymentMethod === "card" ? cardValid : true;

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    if (!canPay) return;
    setProcessing(true);
    try {
      if (paymentMethod === "card") {
        await new Promise((r) => setTimeout(r, 1200));
      }
      const order = await cart.completeOrder({
        paymentMethod,
        appliedOffers: selectedOffers,
      });
      setSavedOrder(order);
      setPaid(true);
    } finally {
      setProcessing(false);
    }
  };

  if (paid && savedOrder && user) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center px-5 py-32">
        <Reveal className="max-w-md text-center">
          <div className="relative mx-auto h-24 w-24">
            <span
              className="animate-celebrate absolute inset-0 flex items-center justify-center text-6xl"
              role="img"
              aria-label="Celebration"
            >
              🎉
            </span>
            {["🎊", "✨", "🥳"].map((emoji, i) => (
              <span
                key={emoji}
                className="confetti-piece absolute text-2xl"
                style={{
                  left: `${20 + i * 28}%`,
                  top: "10%",
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            Payment successful
          </p>
          <h1 className="mt-3 font-display text-4xl text-espresso">
            Order confirmed!
          </h1>
          <p className="mt-2 font-mono text-sm text-mocha/60">
            Order #{savedOrder.orderId}
          </p>
          <p className="mt-4 text-mocha/70">
            Thanks, {user.firstName}! Paid with{" "}
            <strong className="text-espresso">
              {paymentLabels[savedOrder.paymentMethod]}
            </strong>
            . Pickup at <strong className="text-espresso">{location.name}</strong>{" "}
            {savedOrder.pickupTime.toLowerCase()}.
          </p>
          <p className="mt-2 text-sm text-mocha/60">{cafe.address.full}</p>
          {savedOrder.discount > 0 && (
            <p className="mt-3 text-sm text-sage">
              You saved ${savedOrder.discount.toFixed(2)} with member offers
            </p>
          )}
          <p className="mt-4 text-sm font-medium text-espresso">
            Total paid: ${savedOrder.total.toFixed(2)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate("/profile")}>View in profile</Button>
            <Button variant="secondary" onClick={() => navigate("/order")}>
              Order again
            </Button>
          </div>
          <p className="mt-8 text-[11px] text-mocha/40">
            {savedOrder.paymentMethod === "card"
              ? "Demo card payment — no real charge"
              : "Order saved to your account"}
          </p>
        </Reveal>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-espresso/5 bg-espresso pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="page-shell max-w-3xl">
          <button
            type="button"
            onClick={() => navigate("/order")}
            className="mb-6 inline-flex items-center gap-2 text-sm text-crema/70 transition-colors hover:text-parchment"
          >
            <ArrowLeft size={16} />
            Edit order
          </button>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              Checkout
            </p>
            <h1 className="font-display text-4xl text-parchment md:text-5xl">
              Payment
            </h1>
            <p className="mt-3 text-crema/70">
              Hi {user?.firstName} — choose a payment method and attach any offers.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="page-shell max-w-3xl py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <div className="rounded-2xl border border-espresso/10 bg-oat p-6">
                <h2 className="font-display text-xl text-espresso">
                  Order summary
                </h2>
                <div className="mt-4 flex items-start gap-2 text-sm">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-copper" />
                  <div>
                    <p className="font-medium text-espresso">{location.name}</p>
                    <p className="text-mocha/60">{cart.checkout.pickupTime}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 border-t border-espresso/10 pt-5">
                  {cart.items.map((line) => (
                    <li
                      key={line.key}
                      className="flex justify-between gap-3 text-sm"
                    >
                      <span className="text-espresso">
                        {line.quantity}× {lineLabel(line)}
                      </span>
                      <span className="shrink-0 text-mocha">
                        ${linePrice(line).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-1.5 border-t border-espresso/10 pt-4 text-sm">
                  <div className="flex justify-between text-mocha/70">
                    <span>Subtotal</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sage">
                      <span>Offer savings</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-mocha/70">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-espresso">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {eligibleOffers.length > 0 && (
              <Reveal delay={50}>
                <div className="rounded-2xl border border-copper/20 bg-oat p-6">
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="text-copper" />
                    <h2 className="font-display text-lg text-espresso">
                      Attach offers
                    </h2>
                  </div>
                  <p className="mt-2 text-xs text-mocha/60">
                    Select the member offers to apply to this order.
                  </p>
                  <ul className="mt-4 space-y-3">
                    {eligibleOffers.map((offer) => (
                      <li key={offer.id}>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-parchment p-3 transition-colors hover:bg-parchment/80">
                          <input
                            type="checkbox"
                            checked={selectedOffers.includes(offer.id)}
                            onChange={() => toggleOffer(offer.id)}
                            className="mt-1 accent-copper"
                          />
                          <span>
                            <span className="block text-sm font-medium text-espresso">
                              {offer.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-mocha/70">
                              {offer.description}
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <form
                onSubmit={handlePay}
                className="rounded-2xl border border-espresso/10 bg-parchment p-6 md:p-8"
              >
                <h2 className="font-display text-xl text-espresso">
                  Payment method
                </h2>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <PaymentTab
                    active={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}
                    icon={<CreditCard size={18} />}
                    label="Card"
                  />
                  <PaymentTab
                    active={paymentMethod === "cash"}
                    onClick={() => setPaymentMethod("cash")}
                    icon={<Banknote size={18} />}
                    label="Cash"
                  />
                  <PaymentTab
                    active={paymentMethod === "apple_pay"}
                    onClick={() => setPaymentMethod("apple_pay")}
                    icon={<Smartphone size={18} />}
                    label="Apple Pay"
                  />
                </div>

                {paymentMethod === "card" && (
                  <>
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-mocha/60">
                      <Lock size={12} />
                      Demo only — use any test card details
                    </p>
                    <div className="mt-4 space-y-4">
                      <Field
                        label="Name on card"
                        id="card-name"
                        value={cardName}
                        onChange={setCardName}
                        placeholder="Jane Doe"
                        required
                      />
                      <Field
                        label="Card number"
                        id="card-number"
                        value={cardNumber}
                        onChange={(v) => setCardNumber(formatCard(v))}
                        placeholder="4242 4242 4242 4242"
                        required
                        inputMode="numeric"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Expiry"
                          id="expiry"
                          value={expiry}
                          onChange={(v) => setExpiry(formatExpiry(v))}
                          placeholder="MM/YY"
                          required
                          inputMode="numeric"
                        />
                        <Field
                          label="CVC"
                          id="cvc"
                          value={cvc}
                          onChange={(v) =>
                            setCvc(v.replace(/\D/g, "").slice(0, 4))
                          }
                          placeholder="123"
                          required
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "cash" && (
                  <div className="mt-6 rounded-xl bg-oat p-4 text-sm text-mocha/80">
                    <p className="font-medium text-espresso">Pay at pickup</p>
                    <p className="mt-2">
                      Your order will be saved when you confirm. Pay with cash when
                      you collect at the counter.
                    </p>
                  </div>
                )}

                {paymentMethod === "apple_pay" && (
                  <div className="mt-6 rounded-xl bg-oat p-4 text-sm text-mocha/80">
                    <p className="font-medium text-espresso">Apple Pay (demo)</p>
                    <p className="mt-2">
                      Tap below to simulate Apple Pay. Your order is saved on
                      success.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-oat p-4 text-xs text-mocha/70">
                  <Shield size={16} className="mt-0.5 shrink-0 text-copper" />
                  <p>
                    Successful payments are saved to your profile with full order
                    details and payment method.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={processing || !canPay}
                >
                  {processing
                    ? "Processing..."
                    : paymentMethod === "apple_pay"
                      ? ` Pay with Apple Pay · $${total.toFixed(2)}`
                      : paymentMethod === "cash"
                        ? `Confirm order · $${total.toFixed(2)}`
                        : `Pay $${total.toFixed(2)}`}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

function PaymentTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors ${
        active
          ? "border-copper bg-copper/10 text-espresso"
          : "border-espresso/10 bg-oat text-mocha hover:border-copper/40"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  required,
  inputMode,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mocha/60"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className="w-full rounded-xl border border-espresso/10 bg-oat px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-copper focus:ring-2 focus:ring-copper/20"
      />
    </div>
  );
}
