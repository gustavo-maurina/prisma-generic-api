import { Router } from "express";
const router: Router = require("express").Router();
const controller = require("../controllers/usuario.controller");

router.route("/").get(controller.getAll).post(controller.post);

router.route("/:id").get(controller.getById);

module.exports = router;
