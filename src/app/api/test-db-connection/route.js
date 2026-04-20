import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 Testing database connection...");
    console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
    
    // Dynamic import for Prisma
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;
    
    console.log("✅ Prisma client imported successfully");
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database query successful:", result);
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful",
      result 
    });
  } catch (error) {
    console.error("❌ Database connection test failed:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Database connection failed",
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}