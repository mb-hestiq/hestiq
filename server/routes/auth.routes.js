import express from "express";
import { register, login } from "../services/auth.service.js";
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
    const { email, password } = req.body;
    const err = validateAuth(email, password);
    if (err) return res.status(400).json({ success: false, error: err });

    const { user, token } = await register({ email, password });
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

export default router;