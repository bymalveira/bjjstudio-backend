import { type Request, type Response, type NextFunction } from "express";
import { criarSparring, listarSparrings } from "./sparring.service";

export async function criarSparringController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = (req as any).validatedData;

  const sparring = await criarSparring(data);

  return res.status(201).json(sparring);
}

export async function listarSparringController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sparrings = await listarSparrings();

  return res.status(201).json(sparrings);
}
