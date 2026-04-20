import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function GET(req) {
  try {
    // ✅ Extract query params from request
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ plan: "standard" }); // default if not found
    }

    return NextResponse.json({ plan: user.plan });
  } catch (error) {
    console.error("getPlan API error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}