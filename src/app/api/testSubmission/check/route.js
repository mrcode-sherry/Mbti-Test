// /app/api/testSubmission/check/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import TestSubmission from "@/backend/models/testSubmission";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, exists: false, completed: false, message: "Email required" }, { status: 400 });
    }

    const submission = await TestSubmission.findOne({ email });

    return NextResponse.json({
      success: true,
      exists: !!submission,
      completed: submission?.completed || false,
    });
  } catch (error) {
    console.error("Check Submission Error:", error);
    return NextResponse.json({ success: false, exists: false, completed: false, message: error.message }, { status: 500 });
  }
}
