import express from "express";
import { folderController } from "../../controllers/folderController.js";

const router = express.Router();

router.get("/", folderController.getAll);
router.post("/", folderController.createNew);
router.get("/:id", folderController.getById);

export const folderRoutes = router;
