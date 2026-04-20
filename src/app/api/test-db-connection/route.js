import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 Testing database connection...");
    console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    
    // Test 1: Try direct Prisma import
    let prisma;
    let connectionMethod = "";
    
    try {
      console.log("📦 Attempting direct PrismaClient import...");
      const { PrismaClient } = await import("@prisma/client");
      prisma = new PrismaClient();
      connectionMethod = "Direct PrismaClient";
      console.log("✅ Direct PrismaClient created successfully");
    } catch (directError) {
      console.log("⚠️ Direct import failed:", directError.message);
      
      try {
        console.log("📦 Attempting backend prisma import...");
        const { default: prismaClient } = await import("@/backend/prisma");
        prisma = prismaClient;
        connectionMethod = "Backend Prisma";
        console.log("✅ Backend Prisma client imported successfully");
      } catch (backendError) {
        console.error("❌ Backend import also failed:", backendError.message);
        throw new Error(`Both import methods failed: Direct: ${directError.message}, Backend: ${backendError.message}`);
      }
    }
    
    // Test 2: Simple database query
    console.log("🔍 Testing database query...");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database query successful:", result);
    
    // Test 3: Test actual table access
    console.log("🔍 Testing table access...");
    const testCount = await prisma.test.count();
    console.log("✅ Test table accessible, count:", testCount);
    
    // Cleanup
    await prisma.$disconnect();
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful",
      connectionMethod,
      testResult: result,
      testCount,
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error("❌ Database connection test failed:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Database connection failed",
      error: error.message,
      stack: error.stack,
      environment: process.env.NODE_ENV,
      databaseUrlPresent: !!process.env.DATABASE_URL
    }, { status: 500 });
  }
}