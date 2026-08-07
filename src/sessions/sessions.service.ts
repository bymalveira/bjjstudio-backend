import { prisma } from "../lib/prisma";

type CriarSessaoInput = {
  local: string;
  professor: string;
  duracao: number;
  notaGeral: number;
  data: Date;
};

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
