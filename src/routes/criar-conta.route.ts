import { criarConta } from "../controllers/criarConta.controller";
import express from "express";

const router = express.Router();
router.route("/").post(criarConta);

export default router;
