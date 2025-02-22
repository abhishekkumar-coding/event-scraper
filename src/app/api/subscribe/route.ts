import { NextRequest, NextResponse } from "next/server";
import { MongoServerError } from "mongodb"; // Import MongoDB error type
import connectDB from "@/config/db";
import Email from "@/model/email";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const subscription = await Email.create({ email });
    return NextResponse.json(
      { message: "Subscription successful", subscription },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof MongoServerError && error.code === 11000) {
      // ✅ TypeScript now recognizes 'error.code'
      return NextResponse.json({ message: "Email already subscribed" }, { status: 409 });
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Subscription failed", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
