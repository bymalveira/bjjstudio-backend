import * as z from "zod";
import {
  criarSparringSchema,
  atualizarSparringSchema,
} from "./sparring.schema";
import { prisma } from "../lib/prisma";

type SparringRoundInput = z.infer<typeof criarSparringSchema>;
type AtualizarSparringInput = z.infer<typeof atualizarSparringSchema>;

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

export async function buscarSparringPorId(id: string) {
  return await prisma.sparringRound.findUnique({
    where: { id },
  });
}

export async function atualizarSparring(
  id: string,
  dados: AtualizarSparringInput,
) {
  return await prisma.sparringRound.update({
    where: { id },
    data: { ...dados },
  });
}

export async function deletarSparringPorId(id: string) {
  return await prisma.sparringRound.delete({
    where: { id },
  });
}
