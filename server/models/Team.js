import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  title: { type: String },
  image: { type: String },
  tags: { type: [String], enum:["management", "design", "development", "marketing"], default: [] },
}, {
  timestamps: true,
});

export default mongoose.model("Team", TeamSchema);