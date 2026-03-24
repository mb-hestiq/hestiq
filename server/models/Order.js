import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String },
  services: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }
  ],
  total: { type: Number, default: 0 },
  details: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, {
  timestamps: true,
});

export default mongoose.model("Order", OrderSchema);