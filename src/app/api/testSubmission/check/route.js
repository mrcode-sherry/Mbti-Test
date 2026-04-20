import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Dynamic import for Prisma
    let prisma;
    try {
      const { default: prismaClient } = await import("@/backend/prisma");
      prisma = prismaClient;
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { success: false, completed: false, result: null },
        { status: 200 }
      );
    }

    const submission = await prisma.testSubmission.findFirst({
      where: { email: email.toLowerCase().trim() },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      completed: !!submission,
      result: submission?.result || null
    });

  } catch (error) {
    console.error("Check test submission error:", error);
    return NextResponse.json(
      { success: false, completed: false, result: null },
      { status: 200 }
    );
  }
}

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
      result: submission?.result || null,
      answers: submission?.answers || [],
      languages: submission?.languages || []
    });
  } catch (error) {
    console.error("Check Submission Error:", error);
    return NextResponse.json({ success: false, exists: false, completed: false, message: error.message }, { status: 500 });
  }
}
