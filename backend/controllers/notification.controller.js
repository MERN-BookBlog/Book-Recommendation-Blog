import mongoose from "mongoose";

import Notification from "../models/notification.model.js";

export const addNotification = async (req, res) => {
  try {
    const { type, message, to, bookId } = req.body;
    // Basic validation
    if (!type || !message || !to) {
      return res.status(400).json({
        success: false,
        message: "Type, message, and to are required.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({
        success: false,
        message: "'to' must be a valid user ID",
      });
    }

    const newNotification = new Notification({
      type,
      message,
      to,
      from: req.user.userId,
      bookId, // optional
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      success: true,
      message: "Notification added successfully",
      data: savedNotification,
    });
  } catch (err) {
    console.error("Error in  addNotification controller :", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const notification = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username",
      });

    if (notification.length == 0) {
      return res.json({
        message: "No notifications to show — you're all caught up!",
      });
    }

    // update read field in  the all notification
    await Notification.updateMany(
      { to: userId, isRead: false },
      { $set: { isRead: true } }
    );

    // send the notification in response
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error in getUserNotifications:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    // fetch the userid
    const userId = req.user.userId;
    // delete the notification by deleteMany function

    await Notification.deleteMany({ to: userId });
    res
      .status(202)
      .json({ success: true, message: "Notifications deleted successfully!" });
  } catch (err) {
    console.log("Error in deleteNotifications controller : ", err.message);
    res.status(500).json({ success: false, error: "Internal server Error !" });
  }
};
