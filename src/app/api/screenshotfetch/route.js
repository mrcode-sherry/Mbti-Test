import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract query param (?email=...)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log("🔍 Checking proof submission for email:", email);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    // Dynamic import for Prisma
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    // Find proof by email
    const proof = await prisma.proof.findUnique({
      where: { email }
    });

    console.log("📸 Proof submission check result:", {
      email,
      found: !!proof,
      status: proof?.status || null,
      proofId: proof?.id || null
    });

    if (!proof) {
      return NextResponse.json(
        { success: false, message: "No proof found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: proof,
    });
  } catch (err) {
    console.error("❌ Proof GET error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
