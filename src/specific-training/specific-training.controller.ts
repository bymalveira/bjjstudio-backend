import type { Request, Response, NextFunction } from "express";
import {
  criarEspecifico,
  listarEspecifico,
  atualizarEspecifico,
  buscarEspecificoPorId,
  deletarEspecificoPorId,
} from "./specific-training.service";

export async function criarEspecificoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = (req as any).validatedData;

  const especifico = await criarEspecifico(data);

  return res.status(201).json(especifico);
}

export async function listarEspecificoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const especifico = await listarEspecifico();

  return res.status(200).json(especifico);
}

export async function buscarEspecificoPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const especifico = await buscarEspecificoPorId(id);

  if (especifico === null || especifico === undefined) {
    return res.json(404).json({ error: "Erro ao buscar especifico" });
  }

  return res.status(200).json(especifico);
}

export async function atualizarEspecificoController(
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

  const update = await atualizarEspecifico(id, data);

  return res.status(200).json(update);
}

export async function deletarEspecificoPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const deletedSpecific = await deletarEspecificoPorId(id);

  return res.status(200).json(deletedSpecific);
}
