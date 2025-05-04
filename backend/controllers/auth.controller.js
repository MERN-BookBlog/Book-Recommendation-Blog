import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, errors: "Server error" });
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

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in getProfile controller : ", err.message);
    res.status(500).json("Internal Server Error ");
  }
};
