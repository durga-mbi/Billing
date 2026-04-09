import Redis from "ioredis";
import { config } from "../config";

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
});

redis.on("connect", () => console.log(`Redis connected to ${config.redisHost}`));
redis.on("error", (err) => console.error("Redis error", err));

export const redisClient = redis;
export default redis;
