import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import PrismaGenericClient from "../../../config/prisma";
import { objectHasProperty } from "../../helpers/objectHasProperty.helper";
import { genericFindAll } from "./genericFindAll.service";
import { genericFindAllWithParams } from "./genericFindAllWithParams.service";

const prisma: any = PrismaGenericClient;

const findAll = (
  nomeTabela: string,
  columnsToSearch: string[],
  req: Request
) => {
  if (
    objectHasProperty(req.query, "p") ||
    objectHasProperty(req.query, "search")
  )
    return genericFindAllWithParams(nomeTabela, columnsToSearch, req);

  return genericFindAll(nomeTabela);
};

const findById = async (nomeTabela: string, id: string) => {
  try {
    const items = await prisma[nomeTabela as keyof PrismaClient].findUnique({
      where: { id: parseInt(id) },
    });
    return items;
  } finally {
    await prisma.$disconnect();
  }
};

const create = async (nomeTabela: string, body: object) => {
  try {
    const result = await prisma[nomeTabela as keyof PrismaClient].create({
      data: body,
    });

    return result;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Métodos para queries genéricas
 */
export const genericQueries = { create, findById, findAll };
