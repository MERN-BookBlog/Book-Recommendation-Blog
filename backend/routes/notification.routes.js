import express from "express";
import {
  addNotification,
  deleteNotifications,
  getUserNotifications,
} from "../controllers/notification.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", authMiddleware, getUserNotifications);
router.post("/", authMiddleware, addNotification);
router.delete("/", authMiddleware, deleteNotifications);
export default router;
