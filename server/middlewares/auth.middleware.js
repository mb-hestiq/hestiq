import { verifyToken } from "../scripts/token.js";
import User from "../models/User.js";
import { isRevoked } from "../services/tokenBlacklist.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (isRevoked(token)) {
    return res.status(401).json({ success: false, error: "Token has been revoked" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }
  next();
};
