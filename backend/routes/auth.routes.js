import express from "express";
import { testController } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/", testController);

// 📝 Signup route
router.post("/signup", signupController);

// 🔐 Login route
router.post("/login", loginController);

export default router;

