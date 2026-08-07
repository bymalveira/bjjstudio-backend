import { type Request, type Response, type NextFunction } from "express";
import { criarSessao, listarSessoes } from "./sessions.service";

export async function criarSessaoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = req.body;
  const sessao = await criarSessao(data);

  return res.status(201).json(sessao);
}

export async function listarSessoesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessoes = await listarSessoes();

  return res.status(200).json(sessoes);
}
