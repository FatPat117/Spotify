import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protectRoute, UserControllers.getAllUser);

export default router;
