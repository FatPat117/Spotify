import { Router } from "express";
import AlbumControllers from "../controllers/albumControllers.js";

const router = Router();

router.get("/", AlbumControllers.gelAllAlbums);
router.get("/:albumId", AlbumControllers.getAlbumById);

export default router;
