import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addBook,
  getBookById,
  getAllBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, addBook);
router.get("/all", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, getBookById);
export default router;
