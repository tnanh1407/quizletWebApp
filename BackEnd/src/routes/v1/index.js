import express from "express";
import { flashCardRoutes } from "../v1/flashCardRouter.js";
import { userRoutes } from "../v1/userRouter.js";

const router = express.Router();

router.use("/flashCards", flashCardRoutes);
router.use("/users", userRoutes);

export const APIs_V1 = router;
