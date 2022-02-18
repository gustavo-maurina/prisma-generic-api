import { Router } from "express";
import { GenericRequestConfig } from "../models/GenericRequestConfig";
import { genericDelete } from "../services/genericRequests/genericDelete";
import { genericGetAll } from "../services/genericRequests/genericGetAll";
import { genericGetById } from "../services/genericRequests/genericGetById";
import { genericPut } from "../services/genericRequests/genericPut";

const router = Router();
const cfg: GenericRequestConfig = {
  table: "usuario",
  columnsToSearch: ["nome", "sobrenome", "email"],
};

router.route("/").get((req, res) => genericGetAll(req, res, cfg));
router
  .route("/:id")
  .get((req, res) => genericGetById(req, res, cfg))
  .put((req, res) => genericPut(req, res, cfg))
  .delete((req, res) => genericDelete(req, res, cfg));

export default router;
