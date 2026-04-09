import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { userCache } from '../cache/user.cache';
import { config } from '../config';

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '30d' });
};

export const authService = {
  async register(data: any) {
    const userExists = await userRepository.findByEmail(data.email);
    if (userExists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.create({ ...data, password: hashedPassword });

    // Populate cache
    await userCache.set(user.id, user);

    const token = generateToken(user.id);
    return { user, token };
  },

  async login(email: string, pass: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new Error('Invalid credentials');
    }

    // Populate cache
    await userCache.set(user.id, user);

    const token = generateToken(user.id);
    return { user, token };
  },

  async getMe(userId: string) {
    // Sub-10ms optimization: Check cache first
    let user = await userCache.get(userId);
    
    if (!user) {
      user = await userRepository.findById(userId);
      if (user) await userCache.set(userId, user);
    }
    
    return user;
  }
};
