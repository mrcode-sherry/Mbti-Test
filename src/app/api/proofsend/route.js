import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Proof from "@/backend/models/proof";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, method, screenshotUrl, tid } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    if (method !== "screenshot" && method !== "tid") {
      return NextResponse.json(
        { success: false, message: "Invalid method" },
        { status: 400 }
      );
    }

    if (method === "screenshot" && !screenshotUrl) {
      return NextResponse.json(
        { success: false, message: "Screenshot URL required" },
        { status: 400 }
      );
    }
    if (method === "tid" && !tid) {
      return NextResponse.json(
        { success: false, message: "TID required" },
        { status: 400 }
      );
    }

    // 🔍 Check if proof already exists
    const existing = await Proof.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Proof already submitted" },
        { status: 409 }
      );
    }

    const doc = new Proof({
      email,
      screenshotUrl: method === "screenshot" ? screenshotUrl : "",
      tid: method === "tid" ? tid : "",
    });
    await doc.save();

    return NextResponse.json({ success: true, message: "Proof saved" });
  } catch (err) {
    console.error("Proof POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
