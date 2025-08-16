import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Test from "@/backend/models/test";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Check if test already exists for this email
    const existingTest = await Test.findOne({ email });

    if (existingTest) {
      return NextResponse.json({ success: true, exists: true, data: existingTest }, { status: 200 });
    }

    return NextResponse.json({ success: true, exists: false }, { status: 200 });
  } catch (error) {
    console.error("CheckTest API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to check test record", error: error.message },
      { status: 500 }
    );
  }
}
