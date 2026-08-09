import { prisma } from "../lib/prisma";
import * as z from "zod";
import { criarSessaoSchema } from "./sessions.schema";

type CriarSessaoInput = z.infer<typeof criarSessaoSchema>;

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
