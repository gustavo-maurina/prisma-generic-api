import { fazerLogin } from "../controllers/fazerLogin.controllers";
import express from "express";

const router = express.Router();
router.route("/").post(fazerLogin);

export default router;
