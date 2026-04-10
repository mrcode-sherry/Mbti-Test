import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function POST(req) {
  try {
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
        screenshotUrl: method === "screenshot" ? screenshotUrl : null,
        tid: method === "tid" ? tid : null,
      }
    });

    return NextResponse.json({ success: true, message: "Proof saved" });
  } catch (err) {
    console.error("Proof POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
