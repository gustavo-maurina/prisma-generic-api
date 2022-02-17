import { Router } from "express";
import { GenericRequestConfig } from "../models/GenericRequestConfig";
import { genericGetAll } from "../services/genericRequests/genericGetAll";
import { genericGetById } from "../services/genericRequests/genericGetById";

const router = Router();
const cfg: GenericRequestConfig = {
  table: "usuario",
  columnsToSearch: ["nome", "sobrenome", "email"],
};

router.route("/").get((req, res) => genericGetAll(req, res, cfg));
router.route("/:id").get((req, res) => genericGetById(req, res, cfg));

export default router;
