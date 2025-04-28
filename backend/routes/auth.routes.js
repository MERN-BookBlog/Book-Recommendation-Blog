import express from "express";
import { testController } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/", testController);

export default router;
