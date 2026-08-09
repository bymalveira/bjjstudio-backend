import { prisma } from "../lib/prisma";
import * as z from "zod";
import { criarDrillSchema } from "./drills.schema";

type CriarDrillInput = z.infer<typeof criarDrillSchema>;

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
