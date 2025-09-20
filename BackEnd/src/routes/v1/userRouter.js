import express from "express";
import { userController } from "../../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAll);
router.post("/", userController.createNew);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);
router.get("/:id", userController.getById);

export const userRoutes = router;
