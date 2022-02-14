import { Request, Response } from "express";
import path from "path";
import * as genericQueries from "../services/genericQueries.services";
import handleQueryError from "../helpers/handleQueryError.helpers";

const nomeTabela = path.basename(__filename).split(".")[0];
const columnsToSearch = ["nome", "sobrenome", "email"];

const getAll = async (req: Request, res: Response) => {
  try {
    if (!req.query.hasOwnProperty("text"))
      return res.status(200).send(await genericQueries.findAll(nomeTabela));

    return res
      .status(200)
      .send(
        await genericQueries.findAllWithSearch(
          nomeTabela,
          columnsToSearch,
          req.query.text as string
        )
      );
  } catch (err) {
    res.status(500).send(handleQueryError(err));
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .send(await genericQueries.findById(nomeTabela, req.params.id));
  } catch (err) {
    return res.status(500).send(handleQueryError(err));
  }
};

export { getAll, getById };
