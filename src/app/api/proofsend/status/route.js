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

    // ✅ Check in Proof collection (not proofSubmission)
    const proof = await Proof.findOne({ email });

    return NextResponse.json({ submitted: !!proof });
  } catch (err) {
    console.error("Proof status error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
