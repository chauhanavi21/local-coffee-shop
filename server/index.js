import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import menuRouter from "./routes/menu.js";
import ordersRouter from "./routes/orders.js";
import { MEMBER_OFFERS } from "./data/offers.js";
import { seedMenuIfEmpty } from "./lib/seedMenu.js";

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

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
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

function validateEnv() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Create a local .env file (never commit it).");
    process.exit(1);
  }

  const jwtSecret = process.env.JWT_SECRET?.trim();
  if (!jwtSecret) {
    console.error("JWT_SECRET is not set.");
    process.exit(1);
  }

  if (
    isProduction &&
    jwtSecret === "change-this-to-a-long-random-secret-in-production"
  ) {
    console.error("JWT_SECRET must be changed from the default before production deploy.");
    process.exit(1);
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
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
    if (allowedOrigins.length > 2) {
      console.log("CORS allowed origins:", allowedOrigins.join(", "));
    }
  });
}

start();
