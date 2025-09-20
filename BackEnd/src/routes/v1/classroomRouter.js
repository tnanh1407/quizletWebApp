import express from "express";
import { classroomController } from "../../controllers/classroomController.js";

const router = express.Router();

router.get("/", classroomController.getAll);
router.post("/", classroomController.createNew);
router.put("/:id", classroomController.updateById);
router.delete("/:id", classroomController.deleteById);
router.get("/:id", classroomController.getById);

export const classroomRoutes = router;
