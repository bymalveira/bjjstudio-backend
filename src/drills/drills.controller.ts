import type { Request, Response, NextFunction } from "express";
import { criarDrill, listarDrills } from "./drills.service";

export async function criarDrillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = (req as any).validatedData;

  const drill = await criarDrill(data);

  return res.status(201).json(drill);
}

export async function listarDrillsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const drills = await listarDrills();

  return res.status(200).json(drills);
}
