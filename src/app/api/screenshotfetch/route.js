import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Proof from "@/backend/models/proof";

export async function GET(req) {
  try {
    await dbConnect();

    // Extract query param (?email=...)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    // Find proof by email
    const proof = await Proof.findOne({ email });

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
    console.error("Proof GET error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
