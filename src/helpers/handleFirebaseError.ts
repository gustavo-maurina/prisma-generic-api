import { FirebaseError } from "firebase-admin";

/**
 * Trata e retorna mensagem de erro de acordo com o código de erro recebido
 * @param erro
 * @param msg
 * @returns Mensagem de erro formatada
 */
const handleFirebaseError = (erro: any, msg: any) => {
  // switch (erro.code) {
  //   case "auth/invalid-api-key":
  //     msg = "Chave da API inválida. Verifique se o valor está correta.";
  //     break;

  //   case "auth/invalid-user-token":
  //     msg = "Credencial não é mais válida, usuário deve refazer login";
  //     break;
  // }

  let errorObject = erro.errorInfo;

  return errorObject;
};

export default handleFirebaseError;
