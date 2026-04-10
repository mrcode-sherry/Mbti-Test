import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}