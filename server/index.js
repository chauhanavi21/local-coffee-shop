import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import menuRouter from "./routes/menu.js";
import ordersRouter from "./routes/orders.js";
import contactRouter from "./routes/contact.js";
import { MEMBER_OFFERS } from "./data/offers.js";
import { seedMenuIfEmpty } from "./lib/seedMenu.js";
import { seedContactInfo } from "./lib/seedContact.js";

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

function getAllowedOrigins() {
  const defaults = ["http://localhost:5173", "http://127.0.0.1:5173"];
  const fromEnv = [process.env.FRONTEND_URL, process.env.CORS_ORIGINS]
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [...new Set([...defaults, ...fromEnv])];
}

const allowedOrigins = getAllowedOrigins();
const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === "true";

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (allowVercelPreviews && origin.endsWith(".vercel.app")) return true;
  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1,
  });
});

app.get("/api/offers", (_req, res) => {
  res.json({ offers: MEMBER_OFFERS });
});

app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);

function validateEnv() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Create a local .env file (never commit it).");
    process.exit(1);
  }

  const jwtSecret = process.env.JWT_SECRET?.trim();
  if (!jwtSecret) {
    console.error("JWT_SECRET is not set. Add it in Render → Environment.");
    process.exit(1);
  }

  if (isProduction && jwtSecret.length < 16) {
    console.error("JWT_SECRET must be at least 16 characters in production.");
    process.exit(1);
  }

  const placeholderSecrets = new Set([
    "change-this-to-a-long-random-secret-in-production",
    "generate-a-long-random-secret",
  ]);
  if (isProduction && placeholderSecrets.has(jwtSecret)) {
    console.warn(
      "JWT_SECRET is still a placeholder — set a unique random value in Render → Environment for production security.",
    );
  }

  if (isProduction && !process.env.FRONTEND_URL) {
    console.warn(
      "FRONTEND_URL is not set — browser requests from your Vercel site may be blocked by CORS.",
    );
  }
}

async function start() {
  validateEnv();

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    await seedMenuIfEmpty();
    await seedContactInfo();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
    if (allowedOrigins.length > 2) {
      console.log("CORS allowed origins:", allowedOrigins.join(", "));
    }
    if (allowVercelPreviews) {
      console.log("CORS: *.vercel.app preview URLs allowed");
    }
  });
}

start();
