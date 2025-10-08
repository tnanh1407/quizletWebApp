import express from "express";
import { userController } from "../../controllers/userController.js";
import {
  verifyToken,
  isAdmin,
  isSelfOrAdmin,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/avatar", verifyToken, userController.updateAvatar);
router.get("/public", userController.getAllPublic);
router.get("/public/:id", userController.getByIdPublic);
router.get("/", verifyToken, isAdmin, userController.getAll);
router.get("/me", verifyToken, userController.getMe);
router.get("/:id", verifyToken, isSelfOrAdmin, userController.getById);
router.put("/:id", verifyToken, isSelfOrAdmin, userController.updateById);
router.patch(
  "/:id/password",
  verifyToken,
  isSelfOrAdmin,
  userController.changePassword
);
router.delete("/:id", verifyToken, isSelfOrAdmin, userController.deleteById);

export const userRoutes = router;
