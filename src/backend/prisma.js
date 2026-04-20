import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Create adapter
const adapter = new PrismaPg(pool)

// Create Prisma client with adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma