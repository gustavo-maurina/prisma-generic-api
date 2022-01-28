import { Request, Response } from "express";
import path from "path";
const genericQueries = require("../services/genericQueries.service");
const handleError = require("../helpers/handleError.helper");

const tableName = path.basename(__filename).split(".")[0];

module.exports = {
  post: async (req: Request, res: Response) => {
    try {
      res.status(200).send(await genericQueries.create(tableName, req.body));
    } catch (err) {
      res.status(500).send(handleError(err));
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      res.status(200).send(await genericQueries.findAll(tableName));
    } catch (err) {
      res.status(500).send(handleError(err));
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      res
        .status(200)
        .send(await genericQueries.findById(tableName, req.params.id));
    } catch (err) {
      res.status(500).send(handleError(err));
    }
  },
};
