import firebase from "firebase-admin";
import PrismaGenericClient from "../../config/prisma";

interface FirebaseUserProps {
  email: string;
  senha: string;
  nome: string;
  sobrenome: string;
  funcao: number;
  data_nascimento: Date;
}

const salvarUsuarioNoBanco = async (body: FirebaseUserProps, uid: string) => {
  const prisma = PrismaGenericClient;

  try {
    const usuario = await prisma.usuario.create({
      data: {
        id_firebase: uid,
        email: body.email,
        nome: body.nome,
        sobrenome: body.sobrenome,
        id_funcao: body.funcao,
        data_nascimento: new Date(body.data_nascimento),
      },
    });

    return usuario;
  } catch (err: any) {
    await firebase.auth().deleteUser(uid);
    throw err;
  } finally {
    prisma.$disconnect();
  }
};

const criarUsuarioFirebase = async (body: FirebaseUserProps) => {
  const { email, senha, nome, sobrenome } = body;

  return await firebase.auth().createUser({
    email: email,
    password: senha,
    displayName: `${nome} ${sobrenome}`,
  });
};

export const criarUsuario = async (body: FirebaseUserProps) => {
  const usuario = await criarUsuarioFirebase(body);
  await salvarUsuarioNoBanco(body, usuario.uid);

  return usuario;
};
