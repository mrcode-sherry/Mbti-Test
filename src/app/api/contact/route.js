import Contact from "@/backend/models/contact";
import dbConnect from "@/backend/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      subject,
      maritalStatus,
      message
    } = await req.json();

    // Trim values
    const data = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim(),
      phoneNumber: phoneNumber?.trim(),
      subject: subject?.trim(),
      maritalStatus: maritalStatus?.trim(),
      message: message?.trim()
    };

    // Validate all fields are present
    if (Object.values(data).some(v => !v)) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format
    const emailRegex = /^[\w.%+-]+@(gmail|yahoo|hotmail)\.com$/i;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format. Use Gmail, Yahoo, or Hotmail."
        },
        { status: 400 }
      );
    }

    // Phone format
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number. Only digits allowed (10–15 characters)."
        },
        { status: 400 }
      );
    }

    // Save to DB
    const newContact = await Contact.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Contact saved successfully!",
        data: newContact
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact Form Error", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something Went Wrong" },
      { status: 500 }
    );
  }
}
