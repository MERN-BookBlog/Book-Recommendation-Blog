import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addBookToFavorites,
  getFavoriteBooks,
  removeBookFromFavorites,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/favorites", authMiddleware, getFavoriteBooks);
router.post("/favorites", authMiddleware, addBookToFavorites);
router.delete("/favorites/:bookId", authMiddleware, removeBookFromFavorites);

export default router;
