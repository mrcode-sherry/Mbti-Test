import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log("🔍 Checking form submission for email:", email);

    if (!email) {
      return NextResponse.json(
        { success: false, exists: false, message: "Email required" },
        { status: 400 }
      );
    }

    const test = await prisma.test.findUnique({
      where: { email }
    });

    console.log("📋 Form submission check result:", {
      email,
      exists: !!test,
      testId: test?.id || null
    });

    return NextResponse.json({
      success: true,
      exists: !!test,
      message: test ? "Form submitted" : "Form not submitted",
    });
  } catch (error) {
    console.error("❌ Form check error:", error);
    return NextResponse.json(
      { success: false, exists: false, message: error.message },
      { status: 500 }
    );
  }
}