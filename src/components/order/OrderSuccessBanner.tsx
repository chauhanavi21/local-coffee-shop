import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clock, X } from "lucide-react";
import { PaymentCelebration } from "./PaymentCelebration";
import {
  clearOrderSuccess,
  formatCountdown,
  markOrderReceived,
  parsePickupMinutes,
  readOrderSuccess,
  randomReadyMinutes,
  type OrderSuccessPayload,
} from "../../lib/pickup";

const paymentLabels: Record<string, string> = {
  card: "Card",
  cash: "Cash",
  apple_pay: "Apple Pay",
};

export function OrderSuccessBanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [payload, setPayload] = useState<OrderSuccessPayload | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const fromState = (location.state as { orderSuccess?: OrderSuccessPayload })
      ?.orderSuccess;
    const data = fromState ?? readOrderSuccess();
    if (!data) return;

    setPayload(data);
    const totalSeconds = (data.readyMinutes ?? data.pickupMinutes) * 60;
    const elapsed = Math.floor((Date.now() - data.placedAt) / 1000);
    setSecondsLeft(data.receivedAt ? 0 : Math.max(0, totalSeconds - elapsed));
  }, [location.state]);

  useEffect(() => {
    if (!payload) return;
    if (payload.receivedAt) {
      setSecondsLeft(0);
      return;
    }
    const timer = window.setInterval(() => {
      const totalSeconds = (payload.readyMinutes ?? payload.pickupMinutes) * 60;
      const elapsed = Math.floor((Date.now() - payload.placedAt) / 1000);
      const left = Math.max(0, totalSeconds - elapsed);
      setSecondsLeft(left);
      if (left <= 0) {
        window.clearInterval(timer);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [payload]);

  const dismiss = () => {
    clearOrderSuccess();
    setPayload(null);
    navigate("/", { replace: true, state: {} });
  };

  const receiveOrder = () => {
    if (!payload) return;
    const received = { ...payload, receivedAt: Date.now() };
    markOrderReceived(received);
    setPayload(received);
    setSecondsLeft(0);
  };

  if (!payload) return null;

  const received = Boolean(payload.receivedAt);
  const ready = secondsLeft <= 0 || received;
  const paymentText =
    payload.paymentMethod === "cash"
      ? "Pay at pickup"
      : `Paid with ${paymentLabels[payload.paymentMethod] ?? payload.paymentMethod}`;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-[64px] z-40 animate-success-banner border-b border-copper/30 bg-gradient-to-r from-parchment via-oat to-amber/20 shadow-[0_18px_60px_rgba(26,18,9,0.16)] backdrop-blur md:top-[76px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="confetti-dot absolute"
            style={{
              left: `${6 + i * 7}%`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <div className="page-shell relative flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <PaymentCelebration size="sm" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
              Payment successful · Order #{payload.orderId}
            </p>
            <p className="mt-1 font-display text-xl text-espresso sm:text-2xl">
              {received
                ? "Order received. Enjoy!"
                : ready
                  ? "Your order is ready!"
                  : "Your order is ready in"}
            </p>
            <p className="mt-1 text-sm text-mocha/70">
              {paymentText}
              {" · "}${payload.total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-copper/25 bg-parchment px-5 py-3">
            <Clock size={20} className="text-copper" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mocha/50">
                Your order is ready in
              </p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-espresso">
                {received ? "Received" : ready ? "Ready" : formatCountdown(secondsLeft)}
              </p>
              <p className="text-xs text-mocha/60">Selected {payload.pickupTime}</p>
            </div>
          </div>
          {!received && (
            <button
              type="button"
              onClick={receiveOrder}
              className="rounded-full bg-espresso px-4 py-2 text-xs font-semibold text-parchment transition-transform hover:-translate-y-0.5"
            >
              Order received
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="rounded-full p-2 text-mocha/50 transition-colors hover:bg-espresso/5 hover:text-espresso"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="page-shell relative pb-3">
        <Link to="/profile" className="text-xs font-medium text-copper hover:underline">
          View confirmed order in your profile →
        </Link>
      </div>
    </div>
  );
}

export function buildOrderSuccessPayload(order: {
  orderId: string;
  pickupTime: string;
  total: number;
  paymentMethod: string;
}): OrderSuccessPayload {
  const pickupMinutes = parsePickupMinutes(order.pickupTime);
  return {
    orderId: order.orderId,
    pickupTime: order.pickupTime,
    pickupMinutes,
    readyMinutes: randomReadyMinutes(pickupMinutes),
    total: order.total,
    paymentMethod: order.paymentMethod,
    placedAt: Date.now(),
  };
}
