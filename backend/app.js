import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/", authRoutes);

//starts a server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

// NOTE : To start the server use "npm start" command
