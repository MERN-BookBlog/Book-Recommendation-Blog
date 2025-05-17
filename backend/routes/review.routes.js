import express from "express";
import { addReview } from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware , addReview);

export default router;
