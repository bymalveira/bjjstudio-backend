import { prisma } from "../lib/prisma";
import * as z from "zod";
import { criarDrillSchema, atualizarDrillSchema } from "./drills.schema";

type CriarDrillInput = z.infer<typeof criarDrillSchema>;
type atualizarDrillInput = z.infer<typeof atualizarDrillSchema>;

export async function criarDrill({
  tecnica,
  repeticoes,
  tempo,
  nota,
  trainingSessionId,
}: CriarDrillInput) {
  return await prisma.drill.create({
    data: { tecnica, repeticoes, tempo, nota, trainingSessionId },
  });
}

export async function listarDrills() {
  return await prisma.drill.findMany();
}

export async function buscarDrillPorId(id: string) {
  return await prisma.drill.findUnique({
    where: { id },
  });
}

export async function deletarDrillPorId(id: string) {
  return await prisma.drill.delete({
    where: { id },
  });
}

export async function atualizarDrill(id: string, dados: atualizarDrillInput) {
  return await prisma.drill.update({
    where: { id },
    data: { ...dados },
  });
}
