import express from "express";
import rateLimit from "express-rate-limit";
import geoip from "geoip-lite";
import Analytics from "../models/Analytics.js";
import Order from "../models/Order.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many tracking requests." },
});

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function detectDevice(ua = "") {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|windows\s?phone/i.test(ua)) return "mobile";
  return "desktop";
}

function sanitizeData(obj, depth = 0) {
  if (depth > 3 || typeof obj !== "object" || obj === null) return obj;
  const clean = {};
  for (const key of Object.keys(obj)) {
    if (!key.startsWith("$")) {
      clean[key] = sanitizeData(obj[key], depth + 1);
    }
  }
  return clean;
}

function getPeriodStart(period) {
  const now = new Date();
  if (period === "year") return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  if (period === "month") return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return new Date(now.getTime() - 24 * 60 * 60 * 1000);
}

router.post("/track", trackLimiter, async (req, res, next) => {
  try {
    const ip = getClientIp(req);
    const ua = (req.headers["user-agent"] || "").slice(0, 512);
    const rawVid = req.headers["x-visitor-id"] || null;
    const visitorId = rawVid && typeof rawVid === "string" ? rawVid.slice(0, 128) : null;
    const device = detectDevice(ua);
    const geo = geoip.lookup(ip) || {};

    const isReturning = visitorId ? !!(await Analytics.exists({ visitorId })) : false;

    const body = Array.isArray(req.body) ? req.body : [req.body];
    if (body.length > 20) {
      return res.status(400).json({ success: false, error: "Batch size exceeds limit of 20." });
    }

    const events = body.map((e) => {
      if (!e.event || typeof e.event !== "string") throw new Error("Each event requires a valid 'event' field.");
      return {
        event: e.event.slice(0, 100),
        data: e.data ? sanitizeData(e.data) : {},
        url: typeof e.url === "string" ? e.url.slice(0, 2048) : undefined,
        referrer: typeof e.referrer === "string" ? e.referrer.slice(0, 2048) : undefined,
        ip,
        visitorId,
        userAgent: ua,
        device,
        country: geo.country || null,
        city: geo.city || null,
        isReturning,
        timestamp: Number.isFinite(e.timestamp) ? new Date(e.timestamp) : new Date(),
      };
    });

    await Analytics.insertMany(events);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

function parsePeriod(query) {
  return ["day", "month", "year"].includes(query) ? query : "month";
}

router.get("/traffic", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const period = parsePeriod(req.query.period);
    const start = getPeriodStart(period);
    const trendFormat =
      period === "day" ? "%Y-%m-%dT%H:00" : period === "month" ? "%Y-%m-%d" : "%Y-%m";

    const [sessions, pageViewCount, trendAgg] = await Promise.all([
      Analytics.find({ event: "session_start", timestamp: { $gte: start } }, { visitorId: 1 }).lean(),
      Analytics.countDocuments({ event: "page_view", timestamp: { $gte: start } }),
      Analytics.aggregate([
        { $match: { event: "session_start", timestamp: { $gte: start } } },
        { $group: { _id: { $dateToString: { format: trendFormat, date: "$timestamp" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const uniqueVisitors = new Set(sessions.map((e) => e.visitorId).filter(Boolean)).size;
    res.json({
      success: true,
      data: {
        visits: sessions.length,
        pageviews: pageViewCount,
        unique: uniqueVisitors,
        trend: trendAgg.map((t) => ({ label: t._id, count: t.count })),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/source", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const period = parsePeriod(req.query.period);
    const start = getPeriodStart(period);

    const deviceAgg = await Analytics.aggregate([
      { $match: { event: "session_start", timestamp: { $gte: start } } },
      { $group: { _id: "$device", count: { $sum: 1 } } },
    ]);

    const deviceMap = { desktop: 0, tablet: 0, mobile: 0 };
    for (const d of deviceAgg) {
      if (d._id && deviceMap[d._id] !== undefined) deviceMap[d._id] = d.count;
    }

    res.json({ success: true, data: deviceMap });
  } catch (error) {
    next(error);
  }
});

router.get("/orders-stats", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const period = parsePeriod(req.query.period);
    const start = getPeriodStart(period);
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [totalOrders, currentMonthOrders, prevMonthOrders, weekdayAgg] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: currentMonthStart } }),
      Order.countDocuments({ createdAt: { $gte: prevMonthStart, $lt: currentMonthStart } }),
      Order.aggregate([
        { $match: { createdAt: { $gte: start } } },
        { $group: { _id: { $dayOfWeek: "$createdAt" }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const monthChange =
      prevMonthOrders === 0
        ? currentMonthOrders > 0 ? 100 : 0
        : parseFloat((((currentMonthOrders - prevMonthOrders) / prevMonthOrders) * 100).toFixed(1));

    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const byWeekday = WEEKDAYS.map((day, i) => ({
      day,
      count: weekdayAgg.find((w) => w._id === i + 1)?.count || 0,
    }));

    res.json({
      success: true,
      data: { monthly: currentMonthOrders, total: totalOrders, change: monthChange, byWeekday },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/users-stats", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const period = parsePeriod(req.query.period);
    const start = getPeriodStart(period);

    const [orderEvents, geoAgg] = await Promise.all([
      Analytics.find(
        { event: "order_created", timestamp: { $gte: start }, visitorId: { $ne: null } },
        { visitorId: 1 }
      ).lean(),
      Analytics.aggregate([
        { $match: { event: "order_created", timestamp: { $gte: start }, country: { $ne: null } } },
        { $group: { _id: { country: "$country", city: "$city" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    const uniqueVisitorIds = [...new Set(orderEvents.map((e) => e.visitorId))];
    const priorOrdererIds = uniqueVisitorIds.length > 0
      ? await Analytics.distinct("visitorId", {
          event: "order_created",
          timestamp: { $lt: start },
          visitorId: { $in: uniqueVisitorIds },
        })
      : [];

    const priorSet = new Set(priorOrdererIds);
    const returningCount = uniqueVisitorIds.filter((v) => priorSet.has(v)).length;
    const newCount = uniqueVisitorIds.length - returningCount;

    res.json({
      success: true,
      data: {
        new: newCount,
        returning: returningCount,
        geo: geoAgg.map((g) => ({ country: g._id.country, city: g._id.city, count: g.count })),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
