import { Request, Response } from "express";
import { handleQueryError } from "../../helpers/errorHandlers/handleQueryError.helpers";
import { GenericRequestConfig } from "../../models/GenericRequestConfig";
import { genericQueries } from "../genericQueries/genericQueries.services";

export const genericDelete = async (
  req: Request,
  res: Response,
  config: GenericRequestConfig
) => {
  try {
    return res
      .status(200)
      .send(await genericQueries.remove(config.table, req.params.id));
  } catch (err) {
    return res.status(500).send(handleQueryError(err));
  }
};
