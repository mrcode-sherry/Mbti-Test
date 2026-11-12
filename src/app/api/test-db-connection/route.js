export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Dynamic import for Prisma client
    const { default: prismaClient } = await import("@/backend/prisma");
    const prisma = prismaClient;
    
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1 as test`;
    
    console.log('Database connection successful');
    
    return Response.json({ 
      success: true, 
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}