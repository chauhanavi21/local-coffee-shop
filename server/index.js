import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import { MEMBER_OFFERS } from "./data/offers.js";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://chauhanavi843_db_user:Avinash7777@cluster0.5qspsln.mongodb.net/?appName=Cluster0";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1,
    cluster: MONGODB_URI,
  });
});

app.get("/api/offers", (_req, res) => {
  res.json({ offers: MEMBER_OFFERS });
});

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected:", MONGODB_URI);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start();
