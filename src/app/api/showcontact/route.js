import Contact from "@/backend/models/contact";
import dbConnect from "@/backend/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
