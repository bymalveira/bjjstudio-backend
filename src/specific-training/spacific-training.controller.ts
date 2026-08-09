import type { Request, Response, NextFunction } from "express";
import { criarEspecifico, listarEspecifico } from "./spacific-training.service";

export async function criarEspecificoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = (req as any).validatedData;

  const spacific = await criarEspecifico(data);

  return res.status(201).json(spacific);
}

export async function listarEspecificoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const drills = await listarEspecifico();

  return res.status(200).json(drills);
}
