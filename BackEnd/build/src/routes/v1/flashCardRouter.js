import express from "express";
import { flashCardController } from "../../controllers/flashCardController.js";
const router = express.Router();
router.get("/", flashCardController.getAll);
router.post("/", flashCardController.createNew);
router.put("/:id", flashCardController.updateById);
router.delete("/:id", flashCardController.deleteById);
router.get("/:id", flashCardController.getById);
export const flashCardRoutes = router;