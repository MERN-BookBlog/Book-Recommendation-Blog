import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const conn = await mongoose.connect(MONGO_URI);
    console.log("MONGODB connected : ", conn.connection.host);
  } catch (err) {
    console.log("MongoDB connection failed : ", err);
    process.exit(1);
  }
};

export default connectDB;
