import * as controller from "../controllers/usuario.controllers";
import express from "express";
import verifyJwt from "../middlewares/verifyJwt.middlewares";

const router = express.Router();

router.route("/").get(controller.getAll);
router.route("/:id").get(controller.getById);

export default router;
