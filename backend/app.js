import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import "./utils/cronJobs.js";
import connectDB from "./config/dbs.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import userRoutes from "./routes/user.routes.js";
import recommendationRoutes from "./routes/readingList.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cookieParser());
app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/user", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/notification", notificationRoutes);

app.use("/recommendations", recommendationRoutes);

//starts a server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
  connectDB();
});

// NOTE : To start the server use "npm start" command
