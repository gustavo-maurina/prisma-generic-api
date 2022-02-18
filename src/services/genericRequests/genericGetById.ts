import { Request, Response } from "express";
import { handleQueryError } from "../../helpers/errorHandlers/handleQueryError.helpers";
import { GenericRequestConfig } from "../../models/GenericRequestConfig";
import { genericQueries } from "../genericQueries/genericQueries.services";

export const genericGetById = async (
  req: Request,
  res: Response,
  config: GenericRequestConfig
) => {
  try {
    const query = await genericQueries.findById(config.table, req.params.id);
    if (query === null)
      return res.status(404).send({ message: "Registro não encontrado" });

    return res.status(200).send(query);
  } catch (err) {
    return res.status(500).send(handleQueryError(err));
  }
};
