import express from "express";
import { flashCardRoutes } from "../v1/flashCardRouter.js";
import { userRoutes } from "../v1/userRouter.js";
import { classroomRoutes } from "../v1/classroomRouter.js";
import { folderRoutes } from "../v1/folderRouter.js";
import { authRoutes } from "../v1/authRouter.js";

const router = express.Router();

router.use("/flashCards", flashCardRoutes);
router.use("/users", userRoutes);
router.use("/folders", folderRoutes);
router.use("/class", classroomRoutes);
router.use("/auth", authRoutes);

export const APIs_V1 = router;
