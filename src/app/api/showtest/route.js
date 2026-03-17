import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Test from "@/backend/models/test";

export async function GET() {
  try {
    await dbConnect();
    const tests = await Test.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
