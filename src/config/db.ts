import mongoose from "mongoose";
import { scrapeEvents } from "@/lib/scraper";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGO_URI

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable in .env");
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Using existing database connection");
      return mongoose.connection;
    }

    await scrapeEvents()
    await mongoose.connect(MONGODB_URI as string, {
      dbName: "eventsDB", // Set your database name here
    });

    console.log("🚀 Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
