import mongoose from "mongoose";

import Notification from "../models/notification.model.js";

export const sendNotification = async ({ type, message, to, from, bookId }) => {
  if (!mongoose.Types.ObjectId.isValid(to))
    throw new Error("Invalid 'to' user ID");

  const notification = new Notification({ type, message, to, from, bookId });
  return await notification.save();
};
