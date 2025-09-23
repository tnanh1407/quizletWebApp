import express from "express";
import { folderController } from "../../controllers/folderController.js";

const router = express.Router();

router.get("/", folderController.getAll);
router.post("/", folderController.createNew);
router.get("/:id", folderController.getById);
router.put("/:id", folderController.updateById);
router.delete("/:id", folderController.deleteById);

router.patch("/:id/flashcards", folderController.addFlashcards);
router.delete(
  "/:folderId/flashcards/:flashcardId",
  folderController.removeFlashcard
);

export const folderRoutes = router;
