import { PrismaClientValidationError } from "@prisma/client/runtime";

/**
 * Lida com erros do Prisma Client, olhar documentação para visualizar código dos erros
 * @param erro Erro captado pelo bloco catch do try-catch
 * @returns Objeto contendo sempre mensagem de erro, podendo conter código.
 */
const handleQueryerro = (erro: any) => {
  /* 
     Se o erro for do tipo PrismaClientValidationError, não exibirá quando a
     propriedade msg quando for feito log, por isso manter sempre o teste de 
     instanceof
  */
  if (erro instanceof PrismaClientValidationError) return erro.message;

  const fields = erro.meta;
  let msg = "Ocorreu um erro interno.";

  switch (erro.cod) {
    case "P1008":
      msg = "Operações sofream timeout.";
      break;

    case "P1016":
      msg = "Número de parâmetros é incorreto.";
      break;

    case "P1017":
      msg = "Conexão com o servidor perdida.";
      break;

    case "P2001":
      msg = "Registro com condição informada não existe.";
      break;

    case "P2002":
      msg = `Unique constraint ${fields.constraint}.`;
      break;

    case "P2003":
      msg = `Foreign key falhou no campo ${fields.field_name}.`;
      break;

    case "P2004":
      msg = `Constraint ${fields.database_erro} falhou.`;
      break;

    case "P2005":
      msg = `Valor ${fields.field_value} no campo ${fields.field_name} tem tipo inválido.`;
      break;

    case "P2007":
      msg = `Erro na validação: ${fields.database_erro}.`;
      break;

    case "P2010":
      msg = `Raw query falhou. Código: ${fields.cod}. Mensagem:${fields.msg}`;
      break;

    case "P2011":
      msg = `Violação de Null constraint em ${fields.constraint}.`;
      break;

    case "P2012":
      msg = `Campo necessário ${fields.path}.`;
      break;

    case "P2021":
      msg = `Tabela ${fields.table} não existe.`;
      break;

    case "P2022":
      msg = `Coluna ${fields.column} não existe.`;
      break;
  }

  let erroObject: any = { msg: msg + " Operação falhou." };

  if (erro.cod) erroObject.erro_cod = erro.cod;

  return erroObject;
};

export default handleQueryerro;
