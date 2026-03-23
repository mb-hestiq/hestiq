import express from "express";
import User from "../models/User.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import { hashPassword } from "../scripts/hash.js";

const router = express.Router();

router.use(protect, requireRole("admin"));

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id", async (req, res, next) => {
  try {
    const allowed = ["name", "email", "role"];
    const update = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    }
    if (req.body.password) {
      update.password = await hashPassword(req.body.password);
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete("/users", async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: "ids must be a non-empty array" });
    }
    await User.deleteMany({ _id: { $in: ids } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
