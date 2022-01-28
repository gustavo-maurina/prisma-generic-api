import * as controller from "../controllers/usuario.controllers";
import express from "express";

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.post);
router.route("/:id").get(controller.getById);

export default router;
