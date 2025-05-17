import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addBook, getBookById } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, addBook);
router.get("/:id", authMiddleware, getBookById);
export default router;
