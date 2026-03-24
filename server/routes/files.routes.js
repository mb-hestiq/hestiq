import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { protect, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

function getBucket() {
  return new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
}

router.post("/", protect, requireRole("admin"), upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file provided" });
    }
    const bucket = getBucket();
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });
    uploadStream.end(req.file.buffer);
    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });
    const url = `/api/files/${uploadStream.id}`;
    res.status(201).json({ success: true, id: String(uploadStream.id), url });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const bucket = getBucket();
    const files = await bucket.find().sort({ uploadDate: -1 }).toArray();
    res.json({ success: true, files });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let fileId;
    try {
      fileId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid file ID" });
    }
    const bucket = getBucket();
    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files.length) {
      return res.status(404).json({ success: false, error: "File not found" });
    }
    res.set("Content-Type", files[0].contentType || "application/octet-stream");
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    let fileId;
    try {
      fileId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid file ID" });
    }
    const bucket = getBucket();
    await bucket.delete(fileId);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
