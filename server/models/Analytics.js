import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    event: { type: String, required: true, maxlength: 100, index: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    url: { type: String, maxlength: 2048 },
    referrer: { type: String, maxlength: 2048 },
    ip: { type: String, maxlength: 45 },
    visitorId: { type: String, maxlength: 128, index: true },
    userAgent: { type: String, maxlength: 512 },
    device: { type: String, enum: ["desktop", "tablet", "mobile"], default: "desktop" },
    country: { type: String, maxlength: 3 },
    city: { type: String, maxlength: 100 },
    isReturning: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

AnalyticsSchema.index({ event: 1, timestamp: -1 });
AnalyticsSchema.index({ visitorId: 1, timestamp: -1 });
AnalyticsSchema.index({ device: 1, timestamp: -1 });
AnalyticsSchema.index({ country: 1, city: 1 });

export default mongoose.model("Analytics", AnalyticsSchema);
