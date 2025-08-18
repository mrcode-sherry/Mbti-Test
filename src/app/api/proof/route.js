import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Test from "@/backend/models/test";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, proofUrl } = body;

    if (!email || !proofUrl) {
      return NextResponse.json({ success: false, message: "Email and proof required" }, { status: 400 });
    }

    const test = await Test.findOne({ email });

    if (!test) {
      return NextResponse.json({ success: false, message: "Submit test first" }, { status: 403 });
    }

    test.proofUrl = proofUrl;
    await test.save();

    return NextResponse.json({ success: true, message: "Proof submitted successfully" });
  } catch (error) {
    console.error("Proof Submit Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
