import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, exists: false, message: "Email required" },
        { status: 400 }
      );
    }

    const test = await prisma.test.findUnique({
      where: { email }
    });

    return NextResponse.json({
      success: true,
      exists: !!test, // True if a document exists for this email
      message: test ? "Record found" : "No record found",
    });
  } catch (error) {
    console.error("Check Error:", error);
    return NextResponse.json(
      { success: false, exists: false, message: error.message },
      { status: 500 }
    );
  }
}
