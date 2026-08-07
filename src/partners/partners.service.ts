import type { Belts } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

type CriarParceiroInput = {
  nome: string;
  faixa: Belts;
};

export async function criarParceiro({ nome, faixa }: CriarParceiroInput) {
  return await prisma.partner.create({
    data: { nome, faixa },
  });
}

export async function listarParceiros() {
  return await prisma.partner.findMany();
}
