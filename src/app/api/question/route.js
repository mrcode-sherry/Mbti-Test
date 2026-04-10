import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, ...data } = body;

    // ✅ Debug: Log received data
    console.log("📝 Received data:", { email, schoolClass: data.schoolClass, educationType: data.educationType });

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
    }

    const exists = await prisma.test.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({ success: false, message: "Record already exists" }, { status: 409 });
    }

    const newRecord = await prisma.test.create({
      data: { email, ...data }
    });

    // ✅ Debug: Log saved data
    console.log("✅ Saved to DB:", { email, schoolClass: newRecord.schoolClass });

    return NextResponse.json({ success: true, message: "Record saved successfully" });
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
