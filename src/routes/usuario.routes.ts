import * as controller from "../controllers/usuario.controllers";
import express from "express";
import verifyJwt from "../middlewares/verifyJwt.middlewares";

const router = express.Router();

router.route("/").get(verifyJwt, controller.getAll).post(controller.post);
router.route("/:id").get(controller.getById);

export default router;
