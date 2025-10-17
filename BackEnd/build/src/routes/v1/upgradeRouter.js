import express from "express";
import { upgradeController } from "../../controllers/upgradeController.js";
const router = express.Router();
router.get("/", upgradeController.getAll);
router.post("/", upgradeController.createNew);
router.put("/:id", upgradeController.updateById);
router.delete("/:id", upgradeController.deleteById);
router.get("/:id", upgradeController.getById);
export const upgradeRoutes = router;