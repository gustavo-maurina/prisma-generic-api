import { Request, Response } from "express";
import handleQueryError from "../helpers/handleQueryError.helper";
import { criarUsuario } from "../services/criarConta.service";

export const criarConta = async (req: Request, res: Response) => {
  criarUsuario(req.body)
    .then((user: any) => res.status(201).send(user))
    .catch((err: any) => res.status(500).send(handleQueryError(err)));
};
