import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const exists = await prisma.testSubmission.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({ success: true, message: "Test already submitted" });
    }

    const newSubmission = await prisma.testSubmission.create({
      data: { email, completed: true }
    });

    return NextResponse.json({ success: true, message: "Test submitted successfully" });
  } catch (error) {
    console.error("Test Submission Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
