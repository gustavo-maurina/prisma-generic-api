import { Request, Response } from "express";
import { handleQueryError } from "../helpers/errorHandlers/handleQueryError.helpers";
import { criarUsuario } from "../services/criarConta.services";

export const criarConta = async (req: Request, res: Response) => {
  return criarUsuario(req.body)
    .then((user: any) => res.status(201).send(user))
    .catch((err: any) => res.status(500).send(handleQueryError(err)));
};
