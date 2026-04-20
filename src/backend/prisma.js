import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Create Prisma client with better error handling
let prisma

try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma || new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    })
  } else {
    console.error("DATABASE_URL environment variable is not set");
    // Fallback Prisma client for build time
    prisma = globalForPrisma.prisma || new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    })
  }

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (error) {
  console.error("Failed to initialize Prisma client:", error);
  throw error;
}

export { prisma }
export default prisma