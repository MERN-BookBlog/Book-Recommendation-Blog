import express from "express";
import {
  addBookToReadingList,
  getAllReadingListsForUser,
} from "../controllers/readingList.controller.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /reading-list - Add a book to a reading list
router.post("/reading-list", authenticateUser, addBookToReadingList);

// GET /reading-lists - Get all reading lists for the logged-in user
router.get("/reading-lists", authenticateUser, getAllReadingListsForUser);

export default router;
