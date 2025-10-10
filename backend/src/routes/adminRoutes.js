import { Router } from "express";
import AdminControllers from "../controllers/adminControllers.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/check", protectRoute, requireAdmin, AdminControllers.checkAdmin);

router.post("/songs", protectRoute, requireAdmin, AdminControllers.createSong);
router.delete("/songs/:songId", protectRoute, requireAdmin, AdminControllers.deleteSong);

router.post("/albums", protectRoute, requireAdmin, AdminControllers.createAlbum);
router.delete("/albums/albumId", protectRoute, requireAdmin, AdminControllers.deleteAlbum);
export default router;
