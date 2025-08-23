// /app/api/testSubmission/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import TestSubmission from "@/backend/models/testSubmission";

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const exists = await TestSubmission.findOne({ email });
    if (exists) {
      return NextResponse.json({ success: true, message: "Test already submitted" });
    }

    const newSubmission = new TestSubmission({ email, completed: true });
    await newSubmission.save();

    return NextResponse.json({ success: true, message: "Test submitted successfully" });
  } catch (error) {
    console.error("Test Submission Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
