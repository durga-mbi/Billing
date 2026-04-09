import { redisClient } from '../lib/redis';

const USER_CACHE_PREFIX = 'user:';
const CACHE_TTL = 3600 * 24; // 24 hours

export const userCache = {
  async get(userId: string) {
    const data = await redisClient.get(`${USER_CACHE_PREFIX}${userId}`);
    return data ? JSON.parse(data) : null;
  },

  async set(userId: string, userData: any) {
    await redisClient.set(`${USER_CACHE_PREFIX}${userId}`, JSON.stringify(userData), 'EX', CACHE_TTL);
  },

  async delete(userId: string) {
    await redisClient.del(`${USER_CACHE_PREFIX}${userId}`);
  }
};
