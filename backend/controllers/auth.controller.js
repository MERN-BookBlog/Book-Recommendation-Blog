import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import hashPassword from "../utils/hashPassword.js";

export const testController = async (req, res) => {
  res.send("Backend is running ");
};

export const signupController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, errors: "Email already registered" });

    //const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await hashPassword(password); // Use the helper function

    const newUser = new User({ username, email, password: hashedPassword });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
    }

    res.status(201).json({ success: true, newUser });
  } catch (err) {
    console.log("Error in Signup Controller : ", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, errors: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, errors: "Invalid credentials" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ success: true, message: "Login successfully !" });
  } catch (err) {
    console.log("Error in loginController : ", err.message);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("Auth_token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully !" });
  } catch (err) {
    console.log("Error in Logout Controller: ", err.message);
    res.status(500).json({ success: false, error: " Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log("Error in getProfile controller : ", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    let user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(400).json({ error: "User not found ! " });
    }

    if (
      (!currentPassword && newPassword) ||
      (!newPassword && currentPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Provide both current password & new password ! " });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "current Password incorrect ! " });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "New Password must be  atleast 6 character long ! ",
        });
      }
      // hased the password

      user.password = await hashPassword(newPassword);
    }

    user.username = username || user.username;
    user.email = email || user.email;

    user = await user.save();
    user.password = null;

    res
      .status(200)
      .json({ success: true, message: "User updated successfully!", user });
  } catch (err) {
    console.log("Error in updateProfile controller : ", err.message);
    res.status(500).json({ success: false, error: "Internal Sever Error" });
  }
};
