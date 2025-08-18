import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Test from "@/backend/models/test";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, ...testData } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const exists = await Test.findOne({ email });
    if (exists) {
      return NextResponse.json({ success: false, message: "Test already submitted" }, { status: 409 });
    }

    const newTest = new Test({ email, ...testData });
    await newTest.save();

    return NextResponse.json({ success: true, message: "Test submitted successfully" });
  } catch (error) {
    console.error("Submit Test Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
