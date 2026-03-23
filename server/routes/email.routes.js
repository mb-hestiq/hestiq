import express from "express";
import transporter from "../config/mailer.js";
import { companyName } from "../../shared/company.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const { to, subject, text, html, replyTo } = req.body;

    await transporter.sendMail({
      from: `${companyName} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      replyTo,
      html,
    });

    res.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    next(error);
  }
});

export default router;