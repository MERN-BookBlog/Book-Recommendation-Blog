import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addBook,
  getBookById,
  getAllBooks,
  getPersonalizedBooks,
  getTopRatedBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, addBook);
router.get("/all", authMiddleware, getAllBooks);
router.get("/top-rated", authMiddleware, getTopRatedBooks);
router.get("/:id", authMiddleware, getBookById);
router.get("/recommendations/:userId", authMiddleware, getPersonalizedBooks);
export default router;
