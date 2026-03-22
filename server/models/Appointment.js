import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  status: { type: String, enum: ["scheduled", "completed", "canceled"], default: "scheduled" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Appointment", AppointmentSchema);