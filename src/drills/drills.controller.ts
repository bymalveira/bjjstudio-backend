import type { Request, Response, NextFunction } from "express";
import {
  criarDrill,
  listarDrills,
  atualizarDrill,
  buscarDrillPorId,
  deletarDrillPorId,
} from "./drills.service";

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

export async function atualizarDrillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }
  const data = (req as any).validatedData;

  const update = await atualizarDrill(id, data);

  return res.status(200).json(update);
}

export async function buscarDrillPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const drill = await buscarDrillPorId(id);

  if (drill === null || drill === undefined) {
    return res.status(404).json({ error: "Erro ao buscar drill" });
  }

  return res.json(200).json(drill);
}

export async function deletarDrillPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const deletedDrill = await deletarDrillPorId(id);

  return res.status(200).json(deletedDrill);
}
