import * as z from "zod";
import { prisma } from "../lib/prisma";
import {
  criarEspecificoSchema,
  atualizarEspecificoSchema,
} from "./specific-training.schema";

type CriarEspecificoInput = z.infer<typeof criarEspecificoSchema>;
type AtualizarEspecificoInput = z.infer<typeof atualizarEspecificoSchema>;

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

export async function buscarEspecificoPorId(id: string) {
  return await prisma.specificTraining.findUnique({
    where: { id },
  });
}

export async function atualizarEspecifico(
  id: string,
  dados: AtualizarEspecificoInput,
) {
  return await prisma.specificTraining.update({
    where: { id },
    data: { ...dados },
  });
}

export async function deletarEspecificoPorId(id: string) {
  return await prisma.specificTraining.delete({
    where: { id },
  });
}
