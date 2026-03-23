import User from "../models/User.js";
import { hashPassword, comparePassword } from "../scripts/hash.js";
import { signToken } from "../scripts/token.js";

export const register = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const user = await User.create({ name, email, password: hashed });
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

export const updateUser = async (id, data) => {
  const allowed = ["name", "email"];
  const update = {};
  for (const field of allowed) {
    if (data[field] !== undefined) update[field] = data[field];
  }
  if (data.password) {
    update.password = await hashPassword(data.password);
  }
  const user = await User.findByIdAndUpdate(id, update, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};