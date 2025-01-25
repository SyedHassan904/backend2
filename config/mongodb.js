import mongoose from "mongoose";

const connectDB = async () => {
  const conn = process.env.MONGODB_URI;

  try {
    if (!conn) {
      throw new Error("MONGODB_URI is not defined. Check your environment variables.");
    }

    await mongoose.connect(conn)

    console.log("DB connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
