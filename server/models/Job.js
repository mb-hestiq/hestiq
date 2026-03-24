import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  resumeUrl: { type: String },
  message: { type: String },
  appliedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "reviewing", "accepted", "rejected"],
    default: "pending",
  },
});

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, default: "Remote" },
    type: {
      type: String,
      enum: ["Part-time", "Full-time", "Contract", "Internship"],
      default: "Full-time",
    },
    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "USD" },
    },
    postedAt: { type: Date, default: Date.now },
    skills: [{ type: String }],
    status: { type: String, enum: ["active", "closed"], default: "active" },
    applicants: [ApplicantSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Job", JobSchema);
