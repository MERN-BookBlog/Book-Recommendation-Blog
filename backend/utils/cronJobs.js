import cron from "node-cron";
import Notification from "../models/notification.model.js"; // adjust the path
import User from "../models/user.model.js"; // assuming you want to notify all users

// Daily Notification - runs every day at 9:00 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const users = await User.find();

    const notifications = users.map((user) => ({
      type: "system_announcement",
      message: "Here is your daily update! 📚",
      to: user._id,
      from: null, // or use a system user ID
    }));

    await Notification.insertMany(notifications);
    console.log("✅ Daily notifications sent!");
  } catch (err) {
    console.error("❌ Error in daily notification cron:", err.message);
  }
});

// Weekly Notification - runs every Monday at 10:00 AM
cron.schedule("0 10 * * 1", async () => {
  try {
    const users = await User.find();

    const notifications = users.map((user) => ({
      type: "top_picks",
      message: "🔥 Your weekly top book picks are ready!",
      to: user._id,
      from: null,
    }));

    await Notification.insertMany(notifications);
    console.log("✅ Weekly notifications sent!");
  } catch (err) {
    console.error("❌ Error in weekly notification cron:", err.message);
  }
});
