import express from "express";
import { prisma } from "../../config/prisma";

const router = express.Router();

router.route("/").post(async (req, res) => {
  const fullTextSearch = await prisma.usuario.findMany({
    where: {
      OR: [
        {
          nome: {
            contains: "teste",
          },
        },
        {
          sobrenome: {
            contains: "teste",
          },
        },
        {
          email: {
            contains: "@teste.com.br",
          },
        },
      ],
    },
  });

  res.json(fullTextSearch);
});

export default router;
