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

    // Trim values and save all fields separately
    const data = {
      name: `${firstName?.trim()} ${lastName?.trim()}`.trim(),
      email: email?.trim(),
      phoneNumber: phoneNumber?.trim() || null,
      subject: subject?.trim() || null,
      maritalStatus: maritalStatus?.trim() || null,
      message: message?.trim(),
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

    // Phone format validation - strip +, spaces, dashes before checking
    if (phoneNumber) {
      // Remove +, spaces, dashes, parentheses
      let cleanPhone = phoneNumber.trim().replace(/[\s\-\+\(\)]/g, '');
      
      // If starts with 92 (country code), remove it → leaves 10 or 11 digit local number
      if (cleanPhone.startsWith('92') && cleanPhone.length > 11) {
        cleanPhone = cleanPhone.slice(2);
      }
      
      // Now accept: 3002116854 (10 digits) or 03002116854 (11 digits starting with 0)
      const phoneRegex = /^(0?3[0-9]{9})$/;
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid phone number. Please enter a valid Pakistani mobile number (e.g. +92 3001234567)."
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
