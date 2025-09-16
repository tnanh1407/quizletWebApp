import express from "express";
import { flashCardRoutes } from "../v1/flashCardRouter";
import { userRoutes } from "../v1/userRouter";

const router = express.Router();

router.use("/flashCards", flashCardRoutes);
router.use("/users", userRoutes);

export const APIs_V1 = router;
