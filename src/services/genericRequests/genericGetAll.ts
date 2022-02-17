import { Request, Response } from "express";
import { handleQueryError } from "../../helpers/handleQueryError.helpers";
import { GenericRequestConfig } from "../../models/GenericRequestConfig";
import { genericQueries } from "../genericQueries/genericQueries.services";

export const genericGetAll = async (
  req: Request,
  res: Response,
  config: GenericRequestConfig
) => {
  try {
    return res
      .status(200)
      .send(
        await genericQueries.findAll(
          config.table,
          config.columnsToSearch || [],
          req
        )
      );
  } catch (err) {
    res.status(500).send(handleQueryError(err));
  }
};
