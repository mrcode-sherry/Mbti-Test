import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, plan } = await req.json();

    if (!email || !plan) {
      return NextResponse.json(
        { success: false, message: "Email and plan are required" },
        { status: 400 }
      );
    }

    // Dynamic import for Prisma
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;

    const user = await prisma.user.upsert({
      where: { email },
      update: { plan },
      create: { email, plan }
    });

    return NextResponse.json({ success: true, plan: user.plan });
  } catch (error) {
    console.error("Update plan error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}