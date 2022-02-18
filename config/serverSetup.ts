import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import firebase from "firebase-admin";
import fbServiceAccountKey from "./fbServiceAccountKey.json";

const PORT = process.env.SERVER_PORT || 8080;

const startFirebaseSdk = () => {
  if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(fbServiceAccountKey as any),
    });
  else firebase.app();
};

const setConfigMiddlewares = (app: any) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
};

const generateRoutesFromFiles = (app: any) => {
  const routePath = path.resolve(__dirname, "../src/routes/");

  fs.readdirSync(routePath).forEach((file: string) => {
    let fileName = file.replace(".ts", "");
    fileName = fileName.split(".")[0];
    const route = require(`../src/routes/${fileName}.routes`).default; // eslint-disable-line
    app.use("/" + fileName, route);
  });
};

export default function serverSetup() {
  const app = express();

  startFirebaseSdk();
  setConfigMiddlewares(app);
  generateRoutesFromFiles(app);

  app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Generic API Test" }).status(200);
  });

  if (process.env.NODE_ENV !== "test")
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  return app;
}
