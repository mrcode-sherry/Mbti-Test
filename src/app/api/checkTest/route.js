import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Dynamic import for Prisma
    let prisma;
    try {
      const { default: prismaClient } = await import("@/backend/prisma");
      prisma = prismaClient;
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Check if test already exists for this email
    const existingTest = await prisma.test.findUnique({
      where: { email }
    });

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
