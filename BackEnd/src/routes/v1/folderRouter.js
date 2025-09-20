import express from "express";
import { folderController } from "../../controllers/folderController.js";

const router = express.Router();

router.get("/", folderController.getAll);
router.post("/", folderController.createNew);
router.put("/:id", folderController.updateById);
router.delete("/:id", folderController.deleteById);
router.get("/:id", folderController.getById);

export const folderRoutes = router;
