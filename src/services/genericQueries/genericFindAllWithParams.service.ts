import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { prisma } from "../../../config/prisma";
import { objectHasProperty } from "../../helpers/objectHasProperty.helper";
import { createTextSearchCfg, getPaginatedWhere } from "./queryUtils.service";

const getSearchConfig = (columnsToSearch: string[], searchText: string) => {
  const searchConfig = createTextSearchCfg(columnsToSearch, searchText);
  const config: any = {
    where: {
      OR: searchConfig,
    },
  };
  return config;
};

const getPaginatedResponse = async (
  tabela: string,
  queryConfig: any,
  page: string
) => {
  queryConfig = getPaginatedWhere(queryConfig, page);

  const count = await (prisma[tabela as keyof PrismaClient] as any).count();
  const items = await (prisma[tabela as keyof PrismaClient] as any).findMany(
    queryConfig
  );

  return { data: items, totalItems: count };
};

/**
 * Retorna todos os items de acordo de acordo com parâmetros de busca e paginação
 *
 * @param nomeTabela
 * @param columnsToSearch Colunas que busca deve ser feita
 * @param req Request do Express
 * @returns
 */
export const genericFindAllWithParams = async (
  nomeTabela: string,
  columnsToSearch: string[],
  req: Request
) => {
  let response, queryConfig;

  /** configurar query com pesquisa */
  if (objectHasProperty(req.query, "search"))
    queryConfig = getSearchConfig(columnsToSearch, req.query.search as string);

  /** retornar query sem paginação */
  if (!objectHasProperty(req.query, "p")) {
    response = await (prisma[nomeTabela as keyof PrismaClient] as any).findMany(
      queryConfig
    );

    return response;
  }

  /** executar query com paginação, com ou sem search */
  response = getPaginatedResponse(
    nomeTabela,
    queryConfig,
    req.query.p as string
  );

  return response;
};
