import express from "express";
import { testController, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", testController);
router.get("/profile", authMiddleware, getProfile);

export default router;
