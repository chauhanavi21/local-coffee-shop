import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  MapPin,
  Shield,
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

export function Checkout() {
  const { user } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const location = locations[0];

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    pickupTime: string;
    total: number;
    discount: number;
  } | null>(null);
  const [orderId] = useState(
    () => `PJ-${Date.now().toString().slice(-8)}`,
  );

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

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setConfirmation({
      pickupTime: cart.checkout.pickupTime,
      total: cart.total,
      discount: cart.discount,
    });
    await cart.completeOrder();
    setProcessing(false);
    setPaid(true);
  };

  if (paid && confirmation && user) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center px-5 py-32">
        <Reveal className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 text-sage">
            <Check size={28} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            Payment successful
          </p>
          <h1 className="mt-3 font-display text-4xl text-espresso">
            Order confirmed
          </h1>
          <p className="mt-2 font-mono text-sm text-mocha/60">
            Order #{orderId}
          </p>
          <p className="mt-4 text-mocha/70">
            Thanks, {user.firstName}! Your order will be ready for pickup at{" "}
            <strong className="text-espresso">{location.name}</strong>{" "}
            {confirmation.pickupTime.toLowerCase()}.
          </p>
          <p className="mt-2 text-sm text-mocha/60">{cafe.address.full}</p>
          {confirmation.discount > 0 && (
            <p className="mt-3 text-sm text-sage">
              You saved ${confirmation.discount.toFixed(2)} with member offers
            </p>
          )}
          <p className="mt-4 text-sm font-medium text-espresso">
            Total paid: ${confirmation.total.toFixed(2)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate("/order")}>Order again</Button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-espresso/20 px-6 py-3 text-sm font-medium text-espresso transition-colors hover:border-copper hover:text-copper"
            >
              Back to home
            </Link>
          </div>
          <p className="mt-8 text-[11px] text-mocha/40">
            Demo payment — no real transaction was processed
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
              Hi {user?.firstName} — review your order and complete payment below.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="page-shell max-w-3xl py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
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
                  <div className="flex justify-between font-medium text-espresso">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <form
                onSubmit={handlePay}
                className="rounded-2xl border border-espresso/10 bg-parchment p-6 md:p-8"
              >
                <div className="flex items-center gap-2">
                  <CreditCard size={20} className="text-copper" />
                  <h2 className="font-display text-xl text-espresso">
                    Pay with card
                  </h2>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-mocha/60">
                  <Lock size={12} />
                  Demo only — use any test card details
                </p>

                <div className="mt-6 space-y-4">
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

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-oat p-4 text-xs text-mocha/70">
                  <Shield size={16} className="mt-0.5 shrink-0 text-copper" />
                  <p>
                    This is a sample checkout to demonstrate the flow. In
                    production, this connects to Stripe, Square, or your POS
                    system.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={
                    processing ||
                    !cardName.trim() ||
                    cardNumber.replace(/\s/g, "").length < 16 ||
                    expiry.length < 5 ||
                    cvc.length < 3
                  }
                >
                  {processing
                    ? "Processing..."
                    : `Pay $${cart.total.toFixed(2)}`}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </>
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
