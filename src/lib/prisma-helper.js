// Helper function to dynamically import Prisma for Vercel builds
export async function getPrismaClient() {
  try {
    const { default: prisma } = await import("@/backend/prisma");
    return prisma;
  } catch (error) {
    console.error("Failed to load Prisma client:", error);
    throw new Error("Database connection failed");
  }
}