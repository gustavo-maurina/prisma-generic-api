import { PrismaClient } from "@prisma/client";
import PrismaGenericClient from "../../config/prisma";

const prisma: any = PrismaGenericClient;

const createTextSearchCfg = (columns: string[], textToSearch: string) => {
  let configs: any[] = [];

  columns.forEach((col) => {
    let config: any = {};
    config[col] = { contains: textToSearch };
    configs.push(config);
  });

  return configs;
};

export const findAll = async (nomeTabela: string) => {
  try {
    const items = await prisma[nomeTabela as keyof PrismaClient].findMany();
    return items;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const findAllWithSearch = async (
  nomeTabela: string,
  columnsToSearch?: string[],
  textToSearch?: string
) => {
  try {
    const searchConfig = createTextSearchCfg(
      columnsToSearch as string[],
      textToSearch as string
    );

    const items = await prisma[nomeTabela as keyof PrismaClient].findMany({
      where: {
        OR: searchConfig,
      },
    });
    return items;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const findById = async (nomeTabela: string, id: string) => {
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

export const create = async (nomeTabela: string, body: object) => {
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
