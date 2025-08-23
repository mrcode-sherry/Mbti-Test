// /app/api/question/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Test from "@/backend/models/test";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, ...data } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const exists = await Test.findOne({ email });
    if (exists) {
      return NextResponse.json({ success: false, message: "Record already exists" }, { status: 409 });
    }

    const newRecord = new Test({ email, ...data });
    await newRecord.save();

    return NextResponse.json({ success: true, message: "Record saved successfully" });
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
