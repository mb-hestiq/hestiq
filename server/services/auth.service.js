import User from "../models/User.js";
import { hashPassword, comparePassword } from "../scripts/hash.js";
import { signToken, verifyToken } from "../scripts/token.js";

export const register = async ({ email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashed,
  });

  const token = signToken({ id: user._id });

  return { user, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signToken({ id: user._id });

  return { user, token };
};

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}