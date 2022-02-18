import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { prisma } from "../../../config/prisma";
import { genericFindAll } from "./genericFindAll.service";
import { genericFindAllWithParams } from "./genericFindAllWithParams.service";

const findAll = (
  nomeTabela: string,
  columnsToSearch: string[],
  req: Request
) => {
  const hasParams = req.query.p || req.query.search;

  if (hasParams)
    return genericFindAllWithParams(nomeTabela, columnsToSearch, req);

  return genericFindAll(nomeTabela);
};

const findById = async (nomeTabela: string, id: string) => {
  const items = await (
    prisma[nomeTabela as keyof PrismaClient] as any
  ).findUnique({
    where: { id: parseInt(id) },
  });

  return items;
};

const create = async (nomeTabela: string, body: object) => {
  const result = await (prisma[nomeTabela as keyof PrismaClient] as any).create(
    {
      data: body,
    }
  );
  return result;
};

const update = async (nomeTabela: string, body: object, id: string) => {
  const result = await (prisma[nomeTabela as keyof PrismaClient] as any).update(
    {
      where: {
        id: parseInt(id),
      },
      data: body,
    }
  );
  return result;
};

const remove = async (nomeTabela: string, id: string) => {
  const result = await (prisma[nomeTabela as keyof PrismaClient] as any).delete(
    {
      where: {
        id: parseInt(id),
      },
    }
  );
  return result;
};

/**
 * Métodos genéricos para métodos CREATE, POST, PUT, DELETE
 */
export const genericQueries = { create, findById, findAll, update, remove };
