import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Dynamic import for Prisma
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' } // latest first
    });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}