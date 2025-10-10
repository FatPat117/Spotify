import { Router } from "express";
import AuthControllers from "../controllers/authControllers.js";

const router = Router();

router.post("/callback", AuthControllers.authCallback);

export default router;
