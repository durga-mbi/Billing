import { prisma } from '../lib/prisma';

export const userRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true }
    });
  },

  async create(userData: any) {
    const { email, password, firstName, lastName } = userData;
    return prisma.user.create({
      data: {
        email,
        password,
        profile: {
          create: { firstName, lastName }
        }
      },
      include: { profile: true }
    });
  }
};
