import * as controller from "../controllers/usuario.controllers";
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  const prisma = new PrismaClient();
  const fullTextSearch = await prisma.usuario.findMany({
    where: {
      OR: [
        {
          nome: {
            search: "teste",
          },
        },
        {
          sobrenome: {
            search: "teste",
          },
        },
      ],
    },
  });

  res.json(fullTextSearch);
});

export default router;
