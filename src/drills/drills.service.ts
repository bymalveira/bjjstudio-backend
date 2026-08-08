import { prisma } from "../lib/prisma";

type CriarDrillInput = {
  tecnica: string;
  repeticoes: number;
  tempo: number;
  nota?: string;
  trainingSessionId: string;
};

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
