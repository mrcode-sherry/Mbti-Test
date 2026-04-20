import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Simplified Prisma client configuration
let prisma

if (!globalForPrisma.prisma) {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  })
  globalForPrisma.prisma = prisma
} else {
  prisma = globalForPrisma.prisma
}

export { prisma }
export default prisma