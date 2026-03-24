import express from "express";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import Team from "../models/Team.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const ALLOWED_TAGS = ["management", "design", "development", "marketing"];

function getBucket() {
  return new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
}

function extractFileId(imageUrl) {
  if (!imageUrl) return null;
  const parts = imageUrl.split("/");
  return parts[parts.length - 1];
}

async function deleteImageFromGridFS(imageUrl) {
  const fileId = extractFileId(imageUrl);
  if (!fileId) return;
  try {
    const bucket = getBucket();
    await bucket.delete(new ObjectId(fileId));
  } catch {
    // Non-fatal — file may have already been deleted
  }
}

router.post("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const { name, email, title, image, tags } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Name and email are required" });
    }
    const validTags = Array.isArray(tags)
      ? tags.filter((t) => ALLOWED_TAGS.includes(t))
      : [];
    const member = await Team.create({ name, email, title, image, tags: validTags });
    res.status(201).json({ success: true, member });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, members });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id).lean();
    if (!member) {
      return res.status(404).json({ success: false, error: "Team member not found" });
    }
    res.json({ success: true, member });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const existing = await Team.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, error: "Team member not found" });
    }
    const allowed = ["name", "email", "title", "image", "tags"];
    const update = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    }
    if (update.tags !== undefined) {
      update.tags = Array.isArray(update.tags)
        ? update.tags.filter((t) => ALLOWED_TAGS.includes(t))
        : [];
    }
    if (update.image && existing.image && update.image !== existing.image) {
      await deleteImageFromGridFS(existing.image);
    }
    const member = await Team.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, member });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, error: "Team member not found" });
    }
    if (member.image) {
      await deleteImageFromGridFS(member.image);
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: "ids must be a non-empty array" });
    }
    const members = await Team.find({ _id: { $in: ids } }).lean();
    await Team.deleteMany({ _id: { $in: ids } });
    for (const m of members) {
      if (m.image) await deleteImageFromGridFS(m.image);
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
