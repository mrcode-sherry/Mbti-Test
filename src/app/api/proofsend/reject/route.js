import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function PATCH(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const proof = await prisma.proof.update({
      where: { email },
      data: { status: "rejected" }
    });

    if (!proof) {
      return NextResponse.json(
        { success: false, message: "Proof not found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Proof rejected successfully",
      data: proof,
    });
  } catch (err) {
    console.error("Error rejecting proof:", err);
    return NextResponse.json(
      { success: false, message: "Server error: " + err.message },
      { status: 500 }
    );
  }
}