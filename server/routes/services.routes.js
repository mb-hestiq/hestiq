import express from "express";
import Service from "../models/Service.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;