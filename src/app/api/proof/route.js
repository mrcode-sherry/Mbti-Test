import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("🔍 Proof submission started");
    
    const body = await req.json();
    const { email, proofUrl } = body;

    console.log("📧 Email:", email);
    console.log("🖼️ Proof URL:", proofUrl ? "Present" : "Missing");

    if (!email || !proofUrl) {
      return NextResponse.json({ success: false, message: "Email and proof required" }, { status: 400 });
    }

    // Check environment variables
    console.log("🔧 DATABASE_URL:", process.env.DATABASE_URL ? "Present" : "Missing");

    // Try multiple approaches to connect to database
    let prisma;
    try {
      console.log("📦 Importing Prisma client...");
      
      // Try direct import first
      try {
        const { PrismaClient } = await import("@prisma/client");
        prisma = new PrismaClient();
        console.log("✅ Direct Prisma client created successfully");
      } catch (directError) {
        console.log("⚠️ Direct import failed, trying backend import...");
        const { default: prismaClient } = await import("@/backend/prisma");
        prisma = prismaClient;
        console.log("✅ Backend Prisma client imported successfully");
      }
    } catch (dbError) {
      console.error("❌ All database connection attempts failed:", dbError);
      console.error("Error message:", dbError.message);
      console.error("Error stack:", dbError.stack);
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    try {
      console.log("🔍 Looking for test with email:", email);
      const test = await prisma.test.findUnique({
        where: { email }
      });

      if (!test) {
        console.log("❌ No test found for email:", email);
        return NextResponse.json({ success: false, message: "Submit test first" }, { status: 403 });
      }

      console.log("✅ Test found, upserting proof...");
      // Update test with proof URL (if your schema supports it)
      // Or create/update proof record
      const proof = await prisma.proof.upsert({
        where: { email },
        update: { 
          screenshotUrl: proofUrl,
          status: "pending",
          updatedAt: new Date()
        },
        create: { 
          email, 
          screenshotUrl: proofUrl,
          status: "pending"
        }
      });

      console.log("✅ Proof submitted successfully:", proof.id);
      return NextResponse.json({ success: true, message: "Proof submitted successfully" });
    } catch (queryError) {
      console.error("❌ Database query error:", queryError);
      console.error("Query error message:", queryError.message);
      throw queryError;
    } finally {
      // Disconnect Prisma client
      try {
        await prisma.$disconnect();
      } catch (disconnectError) {
        console.error("Warning: Failed to disconnect Prisma client:", disconnectError);
      }
    }
  } catch (error) {
    console.error("❌ Proof Submit Error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
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