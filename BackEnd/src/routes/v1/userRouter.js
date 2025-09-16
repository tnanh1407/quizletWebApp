import express from "express";
import { userController } from "../../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAll);
router.post("/", userController.createNew);
router.get("/:id", userController.getById);

export const userRoutes = router;
