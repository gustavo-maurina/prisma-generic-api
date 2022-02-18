import { Request, Response } from "express";
import { handleQueryError } from "../../helpers/errorHandlers/handleQueryError.helpers";
import { GenericRequestConfig } from "../../models/GenericRequestConfig";
import { genericQueries } from "../genericQueries/genericQueries.services";

export const genericPost = async (
  req: Request,
  res: Response,
  config: GenericRequestConfig
) => {
  try {
    return res
      .status(201)
      .send(await genericQueries.create(config.table, req.body));
  } catch (err) {
    return res.status(500).send(handleQueryError(err));
  }
};
