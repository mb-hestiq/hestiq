import express from "express";
import Appointment from "../models/Appointment.js";
import transporter from "../config/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { phone, date } = req.body;

    const existing = await Appointment.findOne({ date, status: { $ne: "canceled" } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This date is already booked",
      });
    }

    const appointment = await Appointment.create({ phone, date });

    transporter.sendMail({
      from: `Client <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Appointment Booking`,
      html: `
        <div style="font-family: Arial; color: #333;">
          <h2>New Appointment Scheduled</h2>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date & Time:</strong> ${new Date(date).toLocaleString()}</p>
        </div>
      `,
    });

    res.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


router.get("/", async (req, res) => {
  const appointments = await Appointment.find({ status: { $ne: "canceled" } }).sort({ date: 1 });
  res.json({ success: true, appointments });
});

router.get("/booked-dates", async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: { $ne: "canceled" } }).select("date");
    const dates = appointments.map((apt) => new Date(apt.date).toDateString());
    res.json({ success: true, dates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Delete appointment
 */
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "canceled",
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;