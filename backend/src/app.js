//packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Backend response!");
});

//starts a server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

// NOTE : To start the server use "npm start" command
