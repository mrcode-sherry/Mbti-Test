import Test from "@/backend/models/test";
import dbConnect from "@/backend/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required", exists: false },
        { status: 400 }
      );
    }

    const found = await Test.findOne({ email });
    return NextResponse.json({ success: true, exists: !!found });
  } catch (err) {
    console.error("Check Test Error:", err);
    return NextResponse.json(
      { success: false, exists: false, message: err.message },
      { status: 500 }
    );
  }
}
