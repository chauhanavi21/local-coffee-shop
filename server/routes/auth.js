import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { authRequired, signToken } from "../middleware/auth.js";
import { MEMBER_OFFERS } from "../data/offers.js";

const router = Router();

function serializeCart(user) {
  return {
    items: user.cart.items,
    checkout: user.cart.checkout,
  };
}

router.get("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      user: user.toPublicJSON(),
      offers: MEMBER_OFFERS.filter((o) => user.activeOffers.includes(o.id)),
      cart: serializeCart(user),
    });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ error: "Could not load profile" });
  }
});


router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!phone?.trim()) {
      return res.status(400).json({ error: "Phone number is required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      passwordHash,
      activeOffers: MEMBER_OFFERS.map((o) => o.id),
    });

    const token = signToken(user._id.toString());
    res.status(201).json({
      token,
      user: user.toPublicJSON(),
      offers: MEMBER_OFFERS,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Could not create account" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user._id.toString());
    res.json({
      token,
      user: user.toPublicJSON(),
      offers: MEMBER_OFFERS.filter((o) => user.activeOffers.includes(o.id)),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Could not log in" });
  }
});

router.delete("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await Promise.all([
      Order.deleteMany({ userId: user._id }),
      User.deleteOne({ _id: user._id }),
    ]);

    res.json({ ok: true });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ error: "Could not delete account" });
  }
});

export default router;
