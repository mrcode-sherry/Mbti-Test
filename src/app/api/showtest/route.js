import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Dynamic import for Prisma
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    const tests = await prisma.test.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}