import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number },
  discount: { type: Number },
  duration: { type: Number },
  revisits: { type: Number },
  category: { type: String },
  icon: { type: String },
  href: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Service", ServiceSchema);