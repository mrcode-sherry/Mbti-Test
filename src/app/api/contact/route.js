import { NextResponse } from "next/server";

export async function POST(req) {
  try {
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
      name: `${firstName?.trim()} ${lastName?.trim()}`.trim(), // Combine first and last name
      email: email?.trim(),
      message: `Subject: ${subject?.trim()}\nPhone: ${phoneNumber?.trim()}\nMarital Status: ${maritalStatus?.trim()}\n\nMessage: ${message?.trim()}`
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
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

    // Phone format validation
    if (phoneNumber) {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phoneNumber.trim())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid phone number. Only digits allowed (10–15 characters)."
          },
          { status: 400 }
        );
      }
    }

    // Dynamic import for Prisma
    let prisma;
    try {
      const { default: prismaClient } = await import("@/backend/prisma");
      prisma = prismaClient;
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Save to DB
    const newContact = await prisma.contact.create({
      data
    });

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
