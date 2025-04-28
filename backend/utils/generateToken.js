import { sign } from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("Auth_token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // time in milliseconds
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
