import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, proofUrl } = body;

    if (!email || !proofUrl) {
      return NextResponse.json({ success: false, message: "Email and proof required" }, { status: 400 });
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

    const test = await prisma.test.findUnique({
      where: { email }
    });

    if (!test) {
      return NextResponse.json({ success: false, message: "Submit test first" }, { status: 403 });
    }

    // Update test with proof URL (if your schema supports it)
    // Or create/update proof record
    await prisma.proof.upsert({
      where: { email },
      update: { screenshotUrl: proofUrl },
      create: { email, screenshotUrl: proofUrl }
    });

    return NextResponse.json({ success: true, message: "Proof submitted successfully" });
  } catch (error) {
    console.error("Proof Submit Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// GET method to fetch all proofs for admin
export async function GET() {
  try {
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

    const proofs = await prisma.proof.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: proofs });
  } catch (error) {
    console.error("Fetch Proofs Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}