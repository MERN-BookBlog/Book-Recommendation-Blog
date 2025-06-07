import cron from "node-cron";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

// Daily Notification - runs every day at 9:00 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const users = await User.find();

    const notifications = users.map((user) => ({
      type: "system_announcement",
      message: "📚 Start your day with a great book!",
      to: user.userId,
      from: null,
    }));

    await Notification.insertMany(notifications);
    console.log("✅ Daily notifications sent!");
  } catch (err) {
    console.error("❌ Error in daily notification cron:", err.message);
  }
});

cron.schedule("0 17 * * *", async () => {
  try {
    const users = await User.find();

    const notifications = users.map((user) => ({
      type: "book_recommended",
      message: "🎯 We’ve picked a book you might like. Check it out!",
      to: user.userId,
      from: null,
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
      message: "🔥 Here are your top book picks of the week!",
      to: user._id,
      from: null,
    }));

    await Notification.insertMany(notifications);
    console.log("✅ Weekly notifications sent!");
  } catch (err) {
    console.error("❌ Error in weekly notification cron:", err.message);
  }
});
