import * as z from "zod";
import { prisma } from "../lib/prisma";
import { criarParceiroSchema } from "./partners.schema";

type CriarParceiroInput = z.infer<typeof criarParceiroSchema>;

export async function criarParceiro({ nome, faixa }: CriarParceiroInput) {
  return await prisma.partner.create({
    data: { nome, faixa },
  });
}

export async function listarParceiros() {
  return await prisma.partner.findMany();
}
