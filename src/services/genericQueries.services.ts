import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import PrismaGenericClient from "../../config/prisma";

const prisma: any = PrismaGenericClient;

const createTextSearchCfg = (columns: string[], textToSearch: string) => {
  let configs: any[] = [];

  columns.forEach((col) => {
    let config: any = {};
    config[col] = { contains: textToSearch, mode: "insensitive" };
    configs.push(config);
  });

  return configs;
};

const getPaginatedWhere = (where: any, page: any) => {
  let paginated = { take: 10, ...where };
  if (page > 1) paginated.skip = (parseInt(page) - 1) * 10;
  return paginated;
};

export const findAll = async (nomeTabela: string, req: Request) => {
  try {
    let where = {};

    if (req?.query.hasOwnProperty("p"))
      where = getPaginatedWhere(where, req.query.p);

    const items = await prisma[nomeTabela as keyof PrismaClient].findMany(
      where
    );
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
  req?: Request
) => {
  try {
    const searchConfig = createTextSearchCfg(
      columnsToSearch as string[],
      req?.query.search as string
    );

    let where: any = {
      where: {
        OR: searchConfig,
      },
    };

    if (req?.query.hasOwnProperty("p"))
      where = getPaginatedWhere(where, req.query.p);

    const items = await prisma[nomeTabela as keyof PrismaClient].findMany(
      where
    );

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
    throw err;
  }
};
