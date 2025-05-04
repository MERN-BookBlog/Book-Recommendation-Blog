import express from "express";
import { testController, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", testController);
router.get("/profile", authMiddleware, getProfile);

//  Signup route
router.post("/signup", signupController);

//  Login route
router.post("/login", loginController);

export default router;

