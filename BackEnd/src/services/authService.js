import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-refresh-secret";
const JWT_EXPIRES_IN = "15m"; // access token hết hạn nhanh
const JWT_REFRESH_EXPIRES_IN = "7d"; // refresh token sống lâu hơn

// Helper: generate token
const generateTokens = (user) => {
  const payload = { id: user._id, email: user.email, roles: user.roles };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

const register = async (data) => {
  const { username, email, password } = data;

  // Check email tồn tại
  const existing = await userModel.findByEmail(email);
  if (existing) throw new Error("Email already exists");

  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    username,
    email,
    passwordHash,
    roles: ["user"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createdUser = await userModel.createNew(newUser);

  const tokens = generateTokens(createdUser);

  return {
    user: {
      id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      roles: createdUser.roles,
    },
    tokens,
  };
};

const login = async (data) => {
  const { email, password } = data;

  const user = await userModel.findByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid email or password");

  await userModel.updateLastLogin(user._id);

  const tokens = generateTokens(user);

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    },
    tokens,
  };
};

const refresh = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) throw new Error("User not found");

    const tokens = generateTokens(user);
    return tokens;
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

const logout = async (userId) => {
  // Nếu cần invalidate refresh token, xử lý ở DB (ví dụ: blacklist hoặc xoá token)
  return true;
};

const getProfile = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new Error("User not found");

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles,
    status: user.status,
  };
};

export const authService = {
  register,
  login,
  refresh,
  logout,
  getProfile,
};
