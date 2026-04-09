import { PrismaClient } from "@prisma/client";
import { config } from "../config";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasourceUrl: config.databaseUrl,
  });

if (config.nodeEnv !== "production") global.prisma = prisma;
