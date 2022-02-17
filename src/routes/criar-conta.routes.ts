import { criarConta } from "../controllers/criarConta.controllers";
import { Router } from "express";

const router = Router();
router.route("/").post(criarConta);

export default router;
