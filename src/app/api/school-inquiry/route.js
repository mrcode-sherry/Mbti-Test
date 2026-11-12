import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { schoolName, city, address, contactNo, applicantName, email, preferredContact, message } = body;

    // Validate required fields
    if (!schoolName || !city || !address || !contactNo || !applicantName || !email || !preferredContact) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Phone validation
    const cleanPhone = contactNo.trim().replace(/[\s\-\+\(\)]/g, '');
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid contact number." },
        { status: 400 }
      );
    }

    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    const inquiry = await prisma.schoolInquiry.create({
      data: {
        schoolName: schoolName.trim(),
        city: city.trim(),
        address: address.trim(),
        contactNo: contactNo.trim(),
        applicantName: applicantName.trim(),
        email: email.trim().toLowerCase(),
        preferredContact,
        message: message?.trim() || null,
      }
    });

    return NextResponse.json(
      { success: true, message: "Your inquiry has been submitted successfully! We will reach out to you shortly.", data: inquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("School Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    const inquiries = await prisma.schoolInquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Fetch School Inquiries Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
