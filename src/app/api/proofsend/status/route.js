import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Proof from "@/backend/models/proof";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const proof = await Proof.findOne({ email });

    if (!proof) {
      return NextResponse.json({ submitted: false, status: "none" });
    }

    return NextResponse.json({
      submitted: true,
      status: proof.status,   // ✅ now frontend will know if it’s approved
    });
  } catch (err) {
    console.error("Proof status error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
