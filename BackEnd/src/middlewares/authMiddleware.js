import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // nên để .env

// Middleware xác thực người dùng
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer token"
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Gắn user vào request
    req.user = decoded;

    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token" });
  }
};

// Middleware kiểm tra quyền admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Admin access required" });
  }
  next();
};

// Middleware cho phép admin hoặc chính user đó
export const isSelfOrAdmin = (req, res, next) => {
  if (req.user?.role === "admin" || req.user?.id === req.params.id) {
    return next();
  }
  return res.status(StatusCodes.FORBIDDEN).json({ message: "Access denied" });
};

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Cần đăng nhập" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
}
