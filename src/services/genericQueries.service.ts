import { PrismaClient } from "@prisma/client";

module.exports = {
  findAll: async (tableName: string) => {
    const prisma: any = new PrismaClient();
    try {
      const items = await prisma[tableName as keyof PrismaClient].findMany();
      return items;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  },
  findById: async (tableName: string, id: string) => {
    const prisma: any = new PrismaClient();
    try {
      const items = await prisma[tableName as keyof PrismaClient].findUnique({
        where: { id: parseInt(id) },
      });
      return items;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  },
  create: async (tableName: string, body: object) => {
    const prisma: any = new PrismaClient();
    try {
      const result = await prisma[tableName as keyof PrismaClient].create({
        data: body,
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
};
