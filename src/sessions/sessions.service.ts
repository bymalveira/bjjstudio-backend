import { prisma } from "../lib/prisma";
import * as z from "zod";
import { criarSessaoSchema, atualizarSessaoSchema } from "./sessions.schema";

type CriarSessaoInput = z.infer<typeof criarSessaoSchema>;
type AtualizarSessaoInput = z.infer<typeof atualizarSessaoSchema>;

export async function criarSessao({
  local,
  professor,
  duracao,
  notaGeral,
  data,
}: CriarSessaoInput) {
  return await prisma.trainingSession.create({
    data: { local, professor, duracao, notaGeral, data },
  });
}

export async function listarSessoes() {
  return await prisma.trainingSession.findMany();
}

export async function buscarSessaoPorId(id: string) {
  return await prisma.trainingSession.findUnique({
    where: { id },
    include: {
      drills: true,
      sparrings: true,
      specificTrainings: true,
    },
  });
}

export async function deletarSessaoPorId(id: string) {
  return await prisma.trainingSession.delete({
    where: { id },
  });
}

export async function atualizarSessao(id: string, dados: AtualizarSessaoInput) {
  return await prisma.trainingSession.update({
    where: { id },
    data: { ...dados },
  });
}
