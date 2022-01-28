require("dotenv").config();
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";
import firebase from "firebase-admin";
import fbServiceAccountKey from "./fbServiceAccountKey.json";

firebase.initializeApp({
  credential: firebase.credential.cert(fbServiceAccountKey as any),
});

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors<any>());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "API request test" }).status(200);
});

// transformar todos arquivos dentro da pasta routes em rotas
const routePath = path.resolve(__dirname, "../src/routes/");
fs.readdirSync(routePath).forEach((file: string) => {
  let fileName = file.replace(".ts", "");
  fileName = fileName.split(".")[0];

  const route = require(`../src/routes/${fileName}.routes`).default;

  app.use("/" + fileName, route);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
