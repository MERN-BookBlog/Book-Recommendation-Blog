import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const testController = async (req, res) => {
  res.send("Backend is running ");
};
