import { PrismaClientValidationError } from "@prisma/client/runtime";
import { objectHasProperty } from "./objectHasProperty.helper";
import handleFirebaseError from "./handleFirebaseError";
import handlePrismaError from "./handlePrismaError";

/**
 * Lida com erros Gerados em queries, olhar documentação Firebase ou Prisma
 * para visualizar código dos erros.
 * @param erro Erro captado pelo bloco catch do try-catch
 * @returns Objeto contendo sempre mensagem de erro, podendo conter código.
 */
export const handleQueryError = (erro: any) => {
  console.log(erro);

  /* 
     Se o erro for do tipo PrismaClientValidationError, não exibirá quando a
     propriedade msg quando for feito log, por isso manter sempre o teste de 
     instanceof
  */
  if (erro instanceof PrismaClientValidationError) return erro.message;

  let response: any = {};
  response.msg = "Ocorreu um erro interno.";

  if (objectHasProperty(erro, "cod"))
    response = handlePrismaError(erro, response.msg);
  else if (objectHasProperty(erro, "errorInfo"))
    response = handleFirebaseError(erro);

  return response;
};
