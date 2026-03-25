import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import orderRoutes from "./routes/order.routes.js";
import serviceRoutes from "./routes/services.routes.js";
import authRoutes from "./routes/auth.routes.js";
import emailRoutes from "./routes/email.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teamRoutes from "./routes/team.routes.js";
import filesRoutes from "./routes/files.routes.js";
import jobsRoutes from "./routes/jobs.routes.js";
import transporter from "./config/mailer.js";
import { companyName } from "../shared/company.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.set("trust proxy", 1);

//#region Rate Limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many auth attempts, please try again later." },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many contact requests, please try again later." },
});
//#endregion

const allowedOrigins = [
  "https://hestiq.com",
  "https://www.hestiq.com",
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:5173", "http://localhost:4173"] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  exposedHeaders: ["Content-Disposition"],
}));
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});
app.use(express.json());
app.use(generalLimiter);

app.use("/auth", authLimiter, authRoutes);
app.use("/orders", orderRoutes);
app.use("/services", serviceRoutes);
app.use("/email", emailRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/admin", adminRoutes);
app.use("/team", teamRoutes);
app.use("/files", filesRoutes);
app.use("/jobs", jobsRoutes);

app.post("/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `${companyName} <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #342937;">New Contact Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f2f2f2; border-radius: 5px;">${message}</p>
        </div>
      `,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use(errorHandler);
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();