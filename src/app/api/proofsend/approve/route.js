import { NextResponse } from "next/server";

export async function PATCH(req) {
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
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    const proof = await prisma.proof.update({
      where: { email },
      data: { status: "approved" }
    });

    if (!proof) {
      return NextResponse.json(
        { success: false, message: "Proof not found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Proof approved successfully",
      data: proof,
    });
  } catch (err) {
    console.error("Error approving proof:", err);
    return NextResponse.json(
      { success: false, message: "Server error: " + err.message },
      { status: 500 }
    );
  }
}