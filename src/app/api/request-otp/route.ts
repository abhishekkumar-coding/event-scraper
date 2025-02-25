import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Email from "@/model/email";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, number } = await req.json();

    if (!email || !number) {
      return NextResponse.json({ message: "Email and Number are required" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

    await Email.findOneAndUpdate(
      { email },
      { email, number, otp, isVerified: false },
      { upsert: true, new: true }
    );

    await sendEmail(email, otp);
    return NextResponse.json({ message: "OTP sent to email" }, { status: 200 });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: "Error sending OTP", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
