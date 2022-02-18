/**
 * Cria configuração do Prisma Client para pesquisar com texto
 *
 * @param columns colunas que serão feitas as buscas
 * @param textToSearch texto que deve ser buscado
 * @returns configuração para usar search no Prisma Client
 */
export const createTextSearchCfg = (
  columns: string[],
  textToSearch: string
) => {
  const configs: any[] = [];

  columns.forEach((col) => {
    const config: any = {};
    config[col] = { contains: textToSearch, mode: "insensitive" };
    configs.push(config);
  });

  return configs;
};

/**
 *
 * @param currentConfig configuração de query já feita
 * @param page número da página, começando em 1
 * @returns objeto de configuração recebido com adição de configuração para paginação
 */
export const getPaginatedWhere = (currentConfig: any, page: any) => {
  const paginated = { take: 10, ...currentConfig };
  if (page > 1) paginated.skip = (parseInt(page) - 1) * 10;
  return paginated;
};
