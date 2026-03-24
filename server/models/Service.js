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
}, {
  timestamps: true,
});

export default mongoose.model("Service", ServiceSchema);