import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;
    console.log("Connecting to MongoDB...");
    console.log("MongoDB URI:", mongoUri);
    console.log("MongoDB DB Name:", dbName);
    if (!mongoUri)
      throw new Error("MONGO_URI is not defined in environment variables");

    await mongoose.connect(mongoUri, dbName ? { dbName } : {});
    console.log("✅ MongoDB connected");
  }
}
