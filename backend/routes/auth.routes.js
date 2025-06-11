import express from "express";
import {
  signupController,
  logout,
  loginController,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

//  Signup route
router.post("/signup", signupController);

// //  Login route
router.post("/login", loginController);

// Log out route
router.post("/logout", logout);

// update route
router.post("/profile", authMiddleware, updateProfile);
export default router;
