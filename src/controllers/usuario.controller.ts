import { Request, Response } from "express";
import path from "path";
import * as genericQueries from "../services/genericQueries.service";
import handleQueryError from "../helpers/handleQueryError.helper";

const nomeTabela = path.basename(__filename).split(".")[0];

const post = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await genericQueries.create(nomeTabela, req.body));
  } catch (err) {
    res.status(500).send(handleQueryError(err));
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await genericQueries.findAll(nomeTabela));
  } catch (err) {
    res.status(500).send(handleQueryError(err));
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send(await genericQueries.findById(nomeTabela, req.params.id));
  } catch (err) {
    res.status(500).send(handleQueryError(err));
  }
};

export { post, getAll, getById };
