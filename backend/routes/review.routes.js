import express from "express";
import {
  addReview,
  getReviewsByBookId,
} from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addReview);
router.get("/:bookId", authMiddleware, getReviewsByBookId);

export default router;
