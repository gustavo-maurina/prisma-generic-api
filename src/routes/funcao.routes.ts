import { Router } from "express";
import { GenericRequestConfig } from "../models/GenericRequestConfig";
import { genericPost } from "../services/genericRequests/genericPost";

const router = Router();
const cfg: GenericRequestConfig = {
  table: "funcao",
  columnsToSearch: ["descricao"],
};
router.route("/").post((req, res) => genericPost(req, res, cfg));

export default router;
