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
    return res
      .status(200)
      .send(await genericQueries.findById(config.table, req.params.id));
  } catch (err) {
    return res.status(500).send(handleQueryError(err));
  }
};
