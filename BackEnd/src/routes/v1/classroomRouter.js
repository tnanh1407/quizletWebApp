import express from "express";
import { classroomController } from "../../controllers/classroomController.js";

const router = express.Router();

router.get("/", classroomController.getAll);
router.post("/", classroomController.createNew);
router.put("/:id", classroomController.updateById);
router.delete("/:id", classroomController.deleteById);
router.get("/:id", classroomController.getById);

router.patch("/:id/flashcards", classroomController.addFlashcards);
router.delete(
  "/:classroomId/flashcards/:flashcardId",
  classroomController.removeFlashcard
);
router.patch("/:id/folders", classroomController.addFolders);
router.delete(
  "/:classroomId/folders/:folderId",
  classroomController.removeFlashcard
);

export const classroomRoutes = router;
