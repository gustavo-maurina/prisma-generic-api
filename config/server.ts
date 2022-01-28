import { Request, Response } from "express";
require("dotenv").config();
const PORT = process.env.SERVER_PORT;

const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "API request test" }).status(200);
});

// transformar todos arquivos dentro da pasta routes em rotas
const routePath = path.resolve(__dirname, "../src/routes/");
fs.readdirSync(routePath).forEach((file: string) => {
  let fileName = file.replace(".ts", "");
  fileName = fileName.split(".")[0];

  const route = require(`../src/routes/${fileName}.route`);
  app.use("/" + fileName, route);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
