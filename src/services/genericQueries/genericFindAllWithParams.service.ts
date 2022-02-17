import { Request } from "express";
import PrismaGenericClient from "../../../config/prisma";
import { objectHasProperty } from "../../helpers/objectHasProperty.helper";
import { createTextSearchCfg, getPaginatedWhere } from "./queryUtils.service";

const prisma: any = PrismaGenericClient;

const getSearchConfig = (columnsToSearch: string[], searchText: string) => {
  const searchConfig = createTextSearchCfg(columnsToSearch, searchText);
  const config: any = {
    where: {
      OR: searchConfig,
    },
  };
  return config;
};

const getPaginatedConfig = async (
  tabela: string,
  queryConfig: any,
  page: string
) => {
  queryConfig = getPaginatedWhere(queryConfig, page);

  try {
    const items = await prisma[tabela].findMany(queryConfig);
    const count = await prisma[tabela].count();

    return { data: items, totalItems: count };
  } finally {
    prisma.$disconnect();
  }
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
  try {
    const tabela = nomeTabela as string;
    let response;
    let queryConfig;

    /** configurar query com pesquisa */
    if (objectHasProperty(req.query, "search")) {
      queryConfig = getSearchConfig(
        columnsToSearch,
        req.query.search as string
      );
    }

    console.log(queryConfig);

    /** retornar query sem paginação */
    if (!objectHasProperty(req.query, "p")) {
      response = await prisma[tabela].findMany(queryConfig);
      return response;
    }

    /** executar query com paginação, com ou sem search */
    response = getPaginatedConfig(
      nomeTabela,
      queryConfig,
      req.query.p as string
    );

    return response;
  } finally {
    await prisma.$disconnect();
  }
};
