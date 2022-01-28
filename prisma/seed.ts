import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const funcao_medico = await prisma.funcao.create({
    data: {
      descricao: "Médico",
    },
  });

  const usuario_teste = await prisma.usuario.create({
    data: {
      id_firebase: "tEsTe_hAsH_tErCeIrO",
      email: "teste@teste.com.br",
      nome: "Usuário",
      sobrenome: "Teste",
      data_nascimento: new Date(),
      id_funcao: funcao_medico.id,
    },
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
