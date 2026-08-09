import * as z from "zod";
import { prisma } from "../lib/prisma";
import { criarEspecificoSchema } from "./spacific-training.schema";

type CriarEspecificoInput = z.infer<typeof criarEspecificoSchema>;

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
