import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis

// Create Prisma client
let prisma

if (process.env.DATABASE_URL) {
  // Create connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  // Create adapter
  const adapter = new PrismaPg(pool)

  // Create Prisma client with adapter
  prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  })
} else {
  // Fallback Prisma client without adapter for build time
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  })
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
export default prisma