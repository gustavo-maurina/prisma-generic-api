import { NextFunction, Request, Response } from "express";
import firebase from "firebase-admin";

export default function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwt: string = req.headers.authorization as string;

  if (!jwt)
    return res
      .status(401)
      .send({ message: "Não foi encontrado token de autenticação" });

  return firebase
    .auth()
    .verifyIdToken(jwt)
    .then(() => next())
    .catch((err) => res.status(401).send({ err }));
}
