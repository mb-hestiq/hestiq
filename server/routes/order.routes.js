import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Service from "../models/Service.js";
import transporter from "../config/mailer.js";
import { companyName } from "../../shared/company.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Create order
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, email, category, services, message } = req.body;

    if (!name || !email || !Array.isArray(services) || services.length === 0) {
      throw new Error("Name, email, and at least one service are required.");
    }

    const normalizedServices = services
      .filter((value) => typeof value === "string" || typeof value === "number")
      .map((value) => String(value).trim())
      .filter(Boolean);

    if (normalizedServices.length === 0) {
      throw new Error("At least one valid service must be provided.");
    }

    const idCandidates = normalizedServices.filter((value) =>
      mongoose.Types.ObjectId.isValid(value),
    );
    const nameCandidates = normalizedServices.filter(
      (value) => !mongoose.Types.ObjectId.isValid(value),
    );

    const query = [];

    if (idCandidates.length > 0) {
      query.push({ _id: { $in: idCandidates } });
    }

    if (nameCandidates.length > 0) {
      query.push({ name: { $in: nameCandidates } });
    }

    if (query.length === 0) {
      throw new Error("No valid service identifiers were provided.");
    }

    const serviceDocs = await Service.find({ $or: query });

    if (serviceDocs.length === 0) {
      throw new Error("No matching services were found.");
    }

    const matchedKeys = new Set(
      serviceDocs.flatMap((service) => [String(service._id), service.name]),
    );
    const unresolvedServices = normalizedServices.filter(
      (value) => !matchedKeys.has(value),
    );

    if (unresolvedServices.length > 0) {
      throw new Error("Some services could not be resolved.");
    }

    const total = serviceDocs.reduce(
      (sum, service) =>
        sum +
        ((Number(service.price) || 0) *
          (1 - (Number(service.discount) || 0) / 100)),
      0,
    );

    const order = await Order.create({
      name,
      email,
      category,
      services: serviceDocs.map((service) => service._id),
      total,
      details: message,
    });

    res.json({ success: true, order });

    transporter.sendMail({
      from: `${companyName} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New order from ${name}`,
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
              <h2 style="color: #342937;">New Order Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Services:</strong></p>
              <ul>
                ${serviceDocs
                  .map((service) => {
                    const discountedPrice =
                      (Number(service.price) || 0) *
                      (1 - (Number(service.discount) || 0) / 100);

                    return `
                    <li>
                      ${service.name} - 
                      ${
                        service.discount
                          ? `<span style="text-decoration: line-through; color: #888;">
                              $${(Number(service.price) || 0).toFixed(2)}
                            </span>
                            <span style="margin-left: 6px; color: #342937;">
                              $${discountedPrice.toFixed(2)}
                            </span>`
                          : `$${(Number(service.price) || 0).toFixed(2)}`
                      }
                    </li>
                  `;
                  })
                  .join("")}
              </ul>
              <p><strong>Estimated Total:</strong> $${total.toFixed(2)}</p>
              <p><strong>Details:</strong></p>
              <p style="padding: 10px; background-color: #f2f2f2; border-radius: 5px;">${message}</p>
            </div>
          `,
    }).catch((err) => console.error("Order email failed:", err));
  } catch (error) {
    next(error);
  }
});

/**
 * Get all orders
 */
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find().populate("services").sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
});

/**
 * Update order
 */
router.put("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate("services");

    if (!order) throw new Error("Order not found");

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
});

/**
 * Delete order
 */
router.delete("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: "ids must be a non-empty array" });
    }
    await Order.deleteMany({ _id: { $in: ids } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;