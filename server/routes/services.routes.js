import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

/**
 * Create service
 */
router.post("/", async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
});

/**
 * Get all services
 */
router.get("/", async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    next(error);
  }
});

/**
 * Get single service
 */
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

/**
 * Update service
 */
router.put("/:id", async (req, res, next) => {
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

/**
 * Delete service
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;