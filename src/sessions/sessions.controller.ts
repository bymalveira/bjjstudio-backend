import { type Request, type Response, type NextFunction } from "express";
import {
  criarSessao,
  listarSessoes,
  atualizarSessao,
  buscarSessaoPorId,
  deletarSessaoPorId,
} from "./sessions.service";

export async function criarSessaoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = (req as any).validatedData;

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

export async function atualizarSessaoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const date = (req as any).validatedData;

  const update = await atualizarSessao(id, date);

  return res.status(200).json(update);
}

export async function buscarSessaoPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const session = await buscarSessaoPorId(id);

  if (session === null || session === undefined) {
    return res.status(404).json({ error: "Erro ao buscar sessão" });
  }

  return res.status(200).json(session);
}

export async function deletarSessaoPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const deletedSession = await deletarSessaoPorId(id);

  return res.status(200).json(deletedSession);
}
