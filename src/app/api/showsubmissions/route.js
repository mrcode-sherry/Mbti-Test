import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    const submissions = await prisma.testSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ success: false, data: [], error: error.message }, { status: 500 });
  }
}
