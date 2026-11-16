import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    if (email) {
      // Return single record for this student
      const record = await prisma.test.findUnique({ where: { email } });
      if (!record) return NextResponse.json({ success: false, data: null });
      return NextResponse.json({ success: true, data: record });
    }

    // Return all records for admin
    const tests = await prisma.test.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, data: tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
