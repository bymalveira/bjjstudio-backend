import { type Request, type Response, type NextFunction } from "express";
import { listarParceiros, criarParceiro } from "./partners.service";

export async function criarParceiroController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = req.body;
  const parceiro = await criarParceiro(data);

  return res.status(201).json(parceiro);
}

export async function listarParceirosController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parceiros = await listarParceiros();

  return res.status(200).json(parceiros);
}
