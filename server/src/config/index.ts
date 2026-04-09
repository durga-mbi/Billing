import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
const envFile = `.env.${env}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  jwtSecret: process.env.JWT_SECRET || 'secret_key_123',
  nodeEnv: env,
};

console.log(`[Config] Loaded environment: ${env}`);
