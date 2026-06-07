import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import menuRouter from "./routes/menu.js";
import { MEMBER_OFFERS } from "./data/offers.js";
import { seedMenuIfEmpty } from "./lib/seedMenu.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
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

async function start() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Create a local .env file (never commit it).");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    await seedMenuIfEmpty();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start();
