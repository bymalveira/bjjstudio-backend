import * as z from "zod";
import { criarSparringSchema } from "./sparring.schema";
import { prisma } from "../lib/prisma";

type SparringRoundInput = z.infer<typeof criarSparringSchema>;

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
  return await prisma.sparringRound.findMany();
}
