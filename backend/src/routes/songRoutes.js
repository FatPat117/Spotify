import { Router } from "express";
import SongControllers from "../controllers/songControllers.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, SongControllers.getAllSongs);
router.get("/featured", SongControllers.getFeaturedSongs);
router.get("/made-for-you", SongControllers.getMadeForYouSongs);
router.get("/trending", SongControllers.getTrendingSongs);

export default router;
