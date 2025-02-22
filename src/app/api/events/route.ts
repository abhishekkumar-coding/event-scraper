import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Event from "@/model/event";

export async function GET() {
  await connectDB();  // Ensure DB connection

  try {
    const events = await Event.find({});
    console.log("Fetched Events:", events);  // Debugging log
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.log("Error fetching events:", err);
    return NextResponse.json({ err: "Failed to fetch events" }, { status: 500 });
  }
}
