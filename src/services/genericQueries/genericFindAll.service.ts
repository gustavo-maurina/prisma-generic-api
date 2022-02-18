import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../config/prisma";

/**
 * Retorna todos os items da tabela sem filtro ou busca
 *
 * @param nomeTabela
 * @returns Array de items do banco
 */
export const genericFindAll = async (nomeTabela: string) => {
  const items = await (
    prisma[nomeTabela as keyof PrismaClient] as any
  ).findMany({ orderBy: [{ id: "asc" }] });
  return items;
};
