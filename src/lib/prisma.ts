import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const connectionString = process.env["DATABASE_URL"]!;

const poolMax = process.env.NODE_ENV === "production" ? 3 : 20;

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
    max: poolMax,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    transactionOptions: {
      maxWait: 10_000, // max time to wait for a transaction slot (ms)
      timeout: 15_000, // max transaction duration (ms)
    },
  });

globalForPrisma.prisma = prisma;
globalForPrisma.pool = pool;

export default prisma;
