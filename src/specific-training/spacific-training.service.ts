import type { Position } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

type CriarEspecificoInput = {
  guardaTrabalhada: Position;
  passagemTrabalhada: string;
  funcionou: boolean;
  nota?: string;
  parceiroId: string;
  trainingSessionId: string;
};

export async function criarEspecifico({
  guardaTrabalhada,
  passagemTrabalhada,
  funcionou,
  nota,
  parceiroId,
  trainingSessionId,
}: CriarEspecificoInput) {
  return await prisma.specificTraining.create({
    data: {
      guardaTrabalhada,
      passagemTrabalhada,
      funcionou,
      nota,
      parceiroId,
      trainingSessionId,
    },
  });
}

export async function listarEspecifico() {
  return await prisma.specificTraining.findMany();
}
