import express from "express";
import { register, login, updateUser, deleteUser } from "../services/auth.service.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateAuth(email, password) {
  if (!email || !password) return "Email and password are required.";
  if (!EMAIL_RE.test(email)) return "Invalid email address.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const err = validateAuth(email, password);
    if (err) return res.status(400).json({ success: false, error: err });

    const { user, token } = await register({ name, email, password });
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const err = validateAuth(email, password);
    if (err) return res.status(400).json({ success: false, error: err });

    const { user, token } = await login({ email, password });
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", protect, (req, res) => {
  res.json({ success: true });
});

router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.patch("/me", protect, async (req, res, next) => {
  try {
    const user = await updateUser(req.user._id, req.body);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

router.delete("/me", protect, async (req, res, next) => {
  try {
    await deleteUser(req.user._id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/admin", protect, requireRole("admin"), (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;