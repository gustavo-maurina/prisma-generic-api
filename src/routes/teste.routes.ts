import * as controller from "../controllers/usuario.controllers";
import express from "express";
import PrismaGenericClient from "../../config/prisma";

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  const fullTextSearch = await PrismaGenericClient.usuario.findMany({
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
