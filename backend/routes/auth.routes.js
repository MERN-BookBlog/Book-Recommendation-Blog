import express from "express";
import {
  testController,
  signupController,
  logout,
  loginController,
  getProfile,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", testController);
router.get("/profile", authMiddleware, getProfile);

//  Signup route
router.post("/signup", signupController);

// //  Login route
router.post("/login", loginController);

// Log out route
router.post("/logout", logout);
export default router;
