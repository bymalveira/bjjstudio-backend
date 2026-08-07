import type { Position, SparringResult } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

type SparringRoundInput = {
  resultado: SparringResult;
  posicaoInicial: Position;
  posicaoFinal: Position;
  tempo: number;
  nota?: string;
  parceiroId: string;
  trainingSessionId: string;
};

export async function criarSparring({
  resultado,
  posicaoInicial,
  posicaoFinal,
  tempo,
  nota,
  parceiroId,
  trainingSessionId,
}: SparringRoundInput) {
  return await prisma.sparringRound.create({
    data: {
      resultado,
      posicaoInicial,
      posicaoFinal,
      tempo,
      nota,
      parceiroId,
      trainingSessionId,
    },
  });
}

export async function listarSparrings() {
  return prisma.sparringRound.findMany();
}
