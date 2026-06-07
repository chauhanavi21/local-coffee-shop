export function parsePickupMinutes(pickupTime: string): number {
  const lower = pickupTime.toLowerCase();
  const match = lower.match(/(\d+)/);
  const value = match ? Number.parseInt(match[1], 10) : 30;
  if (lower.includes("hour")) return value * 60;
  return value;
}

export function formatCountdown(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export interface OrderSuccessPayload {
  orderId: string;
  pickupTime: string;
  pickupMinutes: number;
  readyMinutes: number;
  total: number;
  paymentMethod: string;
  placedAt: number;
  receivedAt?: number;
}

const STORAGE_KEY = "pj_order_success";
const READY_BUFFER_MS = 10 * 60 * 1000;

export function saveOrderSuccess(payload: OrderSuccessPayload) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function markOrderReceived(payload: OrderSuccessPayload) {
  saveOrderSuccess({ ...payload, receivedAt: Date.now() });
}

export function readOrderSuccess(): OrderSuccessPayload | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as OrderSuccessPayload;
    const readyMinutes = payload.readyMinutes ?? payload.pickupMinutes;
    const expiresAt = payload.placedAt + readyMinutes * 60 * 1000 + READY_BUFFER_MS;
    if (Date.now() > expiresAt) {
      clearOrderSuccess();
      return null;
    }
    return payload;
  } catch {
    clearOrderSuccess();
    return null;
  }
}

export function clearOrderSuccess() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function randomReadyMinutes(pickupMinutes: number): number {
  const min = Math.max(1, Math.ceil(pickupMinutes * 0.45));
  const max = Math.max(min, pickupMinutes - 1);
  if (pickupMinutes <= 1) return 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
