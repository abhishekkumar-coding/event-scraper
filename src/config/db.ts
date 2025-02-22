import mongoose from "mongoose";
import { scrapeEvents } from "@/lib/scraper";

const MONGODB_URI = "mongodb+srv://abhiwebdev20:CXZquCv9iUxMwJPY@scraper-cluster.bqf86.mongodb.net/"

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
    await mongoose.connect(MONGODB_URI, {
      dbName: "eventsDB", // Set your database name here
    });

    console.log("🚀 Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
