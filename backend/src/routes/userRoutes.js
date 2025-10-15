import { Router } from "express";
import { default as UserControllers, default as userControllers } from "../controllers/userControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protectRoute, UserControllers.getAllUser);
router.get('/messages/":userId', protectRoute, userControllers.getAllMessages);

export default router;
