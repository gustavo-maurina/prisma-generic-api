import { criarConta } from "../controllers/criarConta.controllers";
import express from "express";

const router = express.Router();
router.route("/").post(criarConta);

export default router;
