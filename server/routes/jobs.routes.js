import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import Job from "../models/Job.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import { verifyToken } from "../scripts/token.js";
import User from "../models/User.js";

const router = express.Router();

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only PDF and Word documents are allowed"));
    }
    cb(null, true);
  },
});

function getResumeBucket() {
  return new GridFSBucket(mongoose.connection.db, { bucketName: "resumes" });
}

async function resolveAdmin(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return false;
  try {
    const decoded = verifyToken(authHeader.split(" ")[1]);
    const user = await User.findById(decoded.id).lean();
    return user?.role === "admin";
  } catch {
    return false;
  }
}

router.get("/", async (req, res, next) => {
  try {
    const isAdmin = await resolveAdmin(req);
    const filter = isAdmin ? {} : { status: "active" };
    const projection = isAdmin ? {} : { applicants: 0 };
    const jobs = await Job.find(filter, projection).sort({ postedAt: -1 }).lean();
    res.json({ success: true, jobs });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const { title, description, location, type, salary, skills, status, postedAt } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: "title is required" });
    }
    const job = await Job.create({ title, description, location, type, salary, skills, status, postedAt });
    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const allowed = ["title", "description", "location", "type", "salary", "skills", "status", "postedAt"];
    const update = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    }
    const job = await Job.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true, job });
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
    await Job.deleteMany({ _id: { $in: ids } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/resumes/:fileId", protect, requireRole("admin"), async (req, res, next) => {
  try {
    let fileId;
    try {
      fileId = new ObjectId(req.params.fileId);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid file ID" });
    }
    const bucket = getResumeBucket();
    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files.length) {
      return res.status(404).json({ success: false, error: "Resume not found" });
    }
    const file = files[0];
    res.set("Content-Type", file.contentType || "application/octet-stream");
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/apply", resumeUpload.single("resume"), async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, status: "active" });
    if (!job) return res.status(404).json({ success: false, error: "Job not found or no longer accepting applications" });

    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, error: "firstName, lastName, and email are required" });
    }

    let resumeUrl = null;
    if (req.file) {
      const bucket = getResumeBucket();
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });
      uploadStream.end(req.file.buffer);
      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });
      resumeUrl = `/api/jobs/resumes/${uploadStream.id}`;
    }

    job.applicants.push({ firstName, lastName, email, phone, message, resumeUrl });
    await job.save();

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/applicants/:applicantId", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });

    const applicant = job.applicants.id(req.params.applicantId);
    if (!applicant) return res.status(404).json({ success: false, error: "Applicant not found" });

    const allowed = ["firstName", "lastName", "email", "phone", "message", "status"];
    for (const field of allowed) {
      if (req.body[field] !== undefined) applicant[field] = req.body[field];
    }

    await job.save();
    res.json({ success: true, applicant });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/applicants/:applicantId", protect, requireRole("admin"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });

    const applicant = job.applicants.id(req.params.applicantId);
    if (!applicant) return res.status(404).json({ success: false, error: "Applicant not found" });

    applicant.deleteOne();
    await job.save();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
