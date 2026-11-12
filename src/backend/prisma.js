import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const DB_URL = "postgresql://neondb_owner:npg_tcyM0eTK4ZvP@ep-weathered-tooth-anrws1u3-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const globalForPrisma = globalThis

if (!globalForPrisma.prisma) {
  const connectionString = process.env.DATABASE_URL || DB_URL

  // Prisma 7 + adapter-neon: pass config object directly, no separate Pool needed
  const adapter = new PrismaNeon({ connectionString })

  globalForPrisma.prisma = new PrismaClient({
    adapter,
    log: ['error'],
  })
}

export const prisma = globalForPrisma.prisma
export default globalForPrisma.prisma
