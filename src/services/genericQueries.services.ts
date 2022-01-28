import { PrismaClient } from "@prisma/client";

const findAll = async (nomeTabela: string) => {
  const prisma: any = new PrismaClient();
  try {
    const items = await prisma[nomeTabela as keyof PrismaClient].findMany();
    return items;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (nomeTabela: string, id: string) => {
  const prisma: any = new PrismaClient();
  try {
    const items = await prisma[nomeTabela as keyof PrismaClient].findUnique({
      where: { id: parseInt(id) },
    });
    return items;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

const create = async (nomeTabela: string, body: object) => {
  const prisma: any = new PrismaClient();
  try {
    const result = await prisma[nomeTabela as keyof PrismaClient].create({
      data: body,
    });

    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export { findAll, findById, create };
