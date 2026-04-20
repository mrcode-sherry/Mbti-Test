import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, method, tid } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    if (method !== "tid") {
      return NextResponse.json(
        { success: false, message: "Only TID method is supported" },
        { status: 400 }
      );
    }

    if (!tid) {
      return NextResponse.json(
        { success: false, message: "TID required" },
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
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    // 🔍 Check if proof already exists
    const existing = await prisma.proof.findUnique({
      where: { email }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Proof already submitted" },
        { status: 409 }
      );
    }

    const newProof = await prisma.proof.create({
      data: {
        email,
        tid: tid,
        screenshotUrl: null, // Always null since we removed screenshot functionality
      }
    });

    return NextResponse.json({ success: true, message: "TID proof saved successfully" });
  } catch (err) {
    console.error("Proof POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
