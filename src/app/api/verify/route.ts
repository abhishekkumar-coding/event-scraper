import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import Email from "@/model/email";

export async function POST(req : NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await Email.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "User is already verified" }, { status: 200 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json({ message: "Verification successful" }, { status: 200 });
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
