import express from "express";
import { flashCardController } from "../../controllers/flashCardController.js";

const router = express.Router();

router.get("/", flashCardController.getAll);
router.post("/", flashCardController.createNew);
router.get("/:id", flashCardController.getById);

export const flashCardRoutes = router;
