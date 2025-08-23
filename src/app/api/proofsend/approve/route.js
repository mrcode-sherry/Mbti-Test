// File: app/api/proof/approve/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Proof from "@/backend/models/proof";

export async function PATCH(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const proof = await Proof.findOneAndUpdate(
      { email },
      { status: "approved" },
      { new: true }
    );

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
