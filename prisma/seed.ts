import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const funcao_medico = await prisma.funcao.createMany({
    data: [
      {
        descricao: "Médico",
      },
      {
        descricao: "Hospital",
      },
    ],
  });

  const usuario_teste = await prisma.usuario.createMany({
    data: [
      {
        id_firebase: "t3sT3_H4Sh_F1r3B4s3-1",
        email: "teste@teste.com.br",
        nome: "Usuário",
        sobrenome: "Teste",
        data_nascimento: new Date(),
        id_funcao: 1,
      },
      {
        id_firebase: "t3sT3_H4Sh_F1r3B4s3-2",
        email: "zesilva@teste.com.br",
        nome: "Zé",
        sobrenome: "Silva",
        data_nascimento: new Date(),
        id_funcao: 1,
      },
      {
        id_firebase: "t3sT3_H4Sh_F1r3B4s3-3",
        email: "john@teste.com.br",
        nome: "John",
        sobrenome: "Doe",
        data_nascimento: new Date(),
        id_funcao: 1,
      },
      {
        id_firebase: "t3sT3_H4Sh_F1r3B4s3-4",
        email: "jane@teste.com.br",
        nome: "Jane",
        sobrenome: "Doe",
        data_nascimento: new Date(),
        id_funcao: 1,
      },
      {
        id_firebase: "t3sT3_H4Sh_F1r3B4s3-5",
        email: "julia.maria@teste.com.br",
        nome: "Julia",
        sobrenome: "Maria",
        data_nascimento: new Date(),
        id_funcao: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
