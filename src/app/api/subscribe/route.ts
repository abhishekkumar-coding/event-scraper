import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import Email from "@/model/email";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, number } = body;

    if (!email || !number) {
      return NextResponse.json({ message: "Email and Number are required" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    // Save OTP in DB
    await Email.findOneAndUpdate(
      { email }, // Find by email
      { email, number, otp, isVerified: false, date: new Date() }, // Update fields
      { upsert: true, new: true } // Create if not exists
    );

    // Send OTP via Email
    await sendEmail(email, otp);

    return NextResponse.json({ message: "OTP sent to email" }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error sending OTP:", error);

    return NextResponse.json(
      { 
        message: "Error sending OTP", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
