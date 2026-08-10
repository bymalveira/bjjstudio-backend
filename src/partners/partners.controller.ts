import { type Request, type Response, type NextFunction } from "express";
import {
  listarParceiros,
  criarParceiro,
  atualizarParceiro,
  buscarParceiroPorId,
  deletarParceiroPorId,
} from "./partners.service";

export async function criarParceiroController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = (req as any).validatedData;

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

export async function atualizarParceiroController(
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

  const update = await atualizarParceiro(id, data);

  return res.status(200).json(update);
}

export async function buscarParceiroPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const parceiro = await buscarParceiroPorId(id);

  if (parceiro === null || parceiro === undefined) {
    return res.status(404).json({ error: "Erro ao buscar parceiro" });
  }

  return res.status(200).json(parceiro);
}

export async function deletarParceiroPorIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params = req.params;
    const id = params.id;

    if (typeof id !== "string") {
      return res.status(400).json({ error: "id invalido" });
    }

    const deletedPartner = await deletarParceiroPorId(id);

    return res.json(200).json(deletedPartner);
  } catch {
    return res
      .status(409)
      .json({
        error:
          "Não é possível excluir: existem sparrings ou treinos vinculados a este parceiro",
      });
  }
}
