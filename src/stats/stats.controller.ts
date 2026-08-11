import type { Request, Response, NextFunction } from "express";
import {
  contarDrillsPorPeriodo,
  historicoContraParceiro,
  passagensPorGuarda,
} from "./stats.service";

export async function passagensPorGuardaController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const passings = await passagensPorGuarda();

  return res.status(200).json(passings);
}

export async function historicoContraParceiroController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  const id = params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id invalido" });
  }

  const history = await historicoContraParceiro(id);

  if (history.length === 0) {
    return res
      .status(404)
      .json({ error: "historico indusponivel/vazio para esse parceiro" });
  }

  return res.status(200).json(history);
}

export async function contarDrillsPorPeriodoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { inicio, fim } = req.query;

    if (typeof inicio !== "string" || typeof fim !== "string") {
      return res.status(400).json({
        error: "inicio e fim são obrigatórios",
      });
    }

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);

    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
      return res.status(400).json({
        error: "Formato de data invalido",
      });
    }

    const drills = await contarDrillsPorPeriodo(dataInicio, dataFim);

    return res.status(200).json(drills);
  } catch (error) {
    next(error);
  }
}
