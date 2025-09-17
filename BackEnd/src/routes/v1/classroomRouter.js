import express from "express";
import { classroomController } from "../../controllers/classroomController.js";

const router = express.Router();

router.get("/", classroomController.getAll);
router.post("/", classroomController.createNew);
router.get("/:id", classroomController.getById);

export const classroomRoutes = router;
