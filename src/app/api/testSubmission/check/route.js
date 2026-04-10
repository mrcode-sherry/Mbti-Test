import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, exists: false, completed: false, message: "Email required" }, { status: 400 });
    }

    const submission = await prisma.testSubmission.findUnique({
      where: { email }
    });

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
