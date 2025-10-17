import express from "express";
import { authController } from "../../controllers/authController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
const router = express.Router();

// POST /v1/auth/register
router.post("/register", authController.register);

// POST /v1/auth/login
router.post("/login", authController.login);

// POST /v1/auth/logout
router.post("/logout", verifyToken, authController.logout);

// POST /v1/auth/refresh
router.post("/refresh", authController.refresh);

// GET /v1/auth/me
router.get("/me", verifyToken, authController.me);
export const authRoutes = router;