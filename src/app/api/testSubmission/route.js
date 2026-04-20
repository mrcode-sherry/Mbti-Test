import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function POST(req) {
  try {
    const { email, answers, result, languages } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ success: false, message: "Result required" }, { status: 400 });
    }

    const exists = await prisma.testSubmission.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({ success: true, message: "Test already submitted", result: exists.result });
    }

    const newSubmission = await prisma.testSubmission.create({
      data: { 
        email, 
        completed: true,
        result: result,
        answers: answers || [],
        languages: languages || []
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Test submitted successfully",
      result: newSubmission.result
    });
  } catch (error) {
    console.error("Test Submission Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const submission = await prisma.testSubmission.findUnique({
      where: { email }
    });

    if (!submission) {
      return NextResponse.json({ success: false, message: "No test submission found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      result: submission.result,
      completed: submission.completed,
      answers: submission.answers || [],
      languages: submission.languages || []
    });
  } catch (error) {
    console.error("Get Test Result Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
