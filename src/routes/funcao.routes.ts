import { Router } from "express";
import { GenericRequestConfig } from "../models/GenericRequestConfig";
import { genericDelete } from "../services/genericRequests/genericDelete";
import { genericGetAll } from "../services/genericRequests/genericGetAll";
import { genericGetById } from "../services/genericRequests/genericGetById";
import { genericPost } from "../services/genericRequests/genericPost";
import { genericPut } from "../services/genericRequests/genericPut";

const router = Router();
const cfg: GenericRequestConfig = {
  table: "funcao",
  columnsToSearch: ["descricao"],
};

router
  .route("/")
  .post((req, res) => genericPost(req, res, cfg))
  .get((req, res) => genericGetAll(req, res, cfg));

router
  .route("/:id")
  .get((req, res) => genericGetById(req, res, cfg))
  .delete((req, res) => genericDelete(req, res, cfg))
  .put((req, res) => genericPut(req, res, cfg));

export default router;
