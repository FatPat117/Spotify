import { Router } from "express";
import StatControllers from "../controllers/statsControllers.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, StatControllers.getAllStats);

export default router;
