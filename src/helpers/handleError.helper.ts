import { PrismaClientValidationError } from "@prisma/client/runtime";

// Lidar com erros do Prisma, olhar docs para visualizar código de erros
module.exports = (error: any) => {
  /* 
     Se o erro for do tipo PrismaClientValidationError, não exibirá quando a
     propriedade message quando for feito log, por isso manter sempre o teste de 
     instanceof
  */
  if (error instanceof PrismaClientValidationError) return error.message;

  const fields = error.meta;
  let message = "Ocorreu um erro interno.";

  switch (error.code) {
    case "P1008":
      message = "Operações sofream timeout.";
      break;

    case "P1016":
      message = "Número de parâmetros é incorreto.";
      break;

    case "P1017":
      message = "Conexão com o servidor perdida.";
      break;

    case "P2001":
      message = "Registro com condição informada não existe.";
      break;

    case "P2002":
      message = `Unique constraint ${fields.constraint}.`;
      break;

    case "P2003":
      message = `Foreign key falhou no campo ${fields.field_name}.`;
      break;

    case "P2004":
      message = `Constraint ${fields.database_error} falhou.`;
      break;

    case "P2005":
      message = `Valor ${fields.field_value} no campo ${fields.field_name} tem tipo inválido.`;
      break;

    case "P2007":
      message = `Erro na validação: ${fields.database_error}.`;
      break;

    case "P2010":
      message = `Raw query falhou. Código: ${fields.code}. Mensagem:${fields.message}`;
      break;

    case "P2011":
      message = `Violação de Null constraint em ${fields.constraint}.`;
      break;

    case "P2012":
      message = `Campo necessário ${fields.path}.`;
      break;

    case "P2021":
      message = `Tabela ${fields.table} não existe.`;
      break;

    case "P2022":
      message = `Coluna ${fields.column} não existe.`;
      break;
  }

  let errorObject: any = { message: message + " Operação falhou." };

  if (error.code) errorObject.error_code = error.code;

  return errorObject;
};
