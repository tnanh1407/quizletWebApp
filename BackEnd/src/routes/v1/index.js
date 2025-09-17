import express from "express";
import { flashCardRoutes } from "../v1/flashCardRouter.js";
import { userRoutes } from "../v1/userRouter.js";
import { classroomRoutes } from "./classroomRouter.js";
import { folderRoutes } from "../v1/folderRouter.js";

const router = express.Router();

router.use("/flashCards", flashCardRoutes);
router.use("/users", userRoutes);
router.use("/folder", folderRoutes);
router.use("/class", classroomRoutes);

export const APIs_V1 = router;
