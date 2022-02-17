import { PrismaClient } from "@prisma/client";
import PrismaGenericClient from "../../../config/prisma";

const prisma: any = PrismaGenericClient;

/**
 * Retorna todos os items da tabela sem filtro ou busca
 *
 * @param nomeTabela
 * @returns Array de items do banco
 */
export const genericFindAll = async (nomeTabela: string) => {
  try {
    const items = await prisma[nomeTabela as keyof PrismaClient].findMany();
    return items;
  } finally {
    await prisma.$disconnect();
  }
};
