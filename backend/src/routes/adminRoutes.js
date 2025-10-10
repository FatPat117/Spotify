import { Router } from "express";
import AdminControllers from "../controllers/adminControllers.js";
const router = Router();

router.get("/", AdminControllers.getAdmin);

export default router;
