import { type Request, type Response, type NextFunction } from "express";
import {
  criarSparring,
  listarSparrings,
  atualizarSparring,
  buscarSparringPorId,
  deletarSparringPorId,
} from "./sparring.service";

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

export async function atualizarSparringController(
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

  const update = await atualizarSparring(id, data);

  return res.status(200).json(update);
}

export async function buscarSparringPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const sparring = await buscarSparringPorId(id);

  if (sparring === null || sparring === undefined) {
    return res.status(404).json({ error: "Erro ao buscar sparring" });
  }

  return res.status(200).json(sparring);
}

export async function deletarSparringPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const deletedSparring = await deletarSparringPorId(id);

  return res.status(200).json(deletedSparring);
}
