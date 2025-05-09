import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbs.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

//starts a server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
  connectDB();
});

// NOTE : To start the server use "npm start" command
