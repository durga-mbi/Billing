import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { redisClient } from '../lib/redis';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  try {
    // 10ms Goal: Check Redis first
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const cachedUser = await redisClient.get(`user:${decoded.id}`);

    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      return next();
    }

    // Fallback? If not in Redis, we could fetch from DB, but for <10ms we should probably just fail or re-cache
    return res.status(401).json({ success: false, message: 'Session expired or invalid' });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};
