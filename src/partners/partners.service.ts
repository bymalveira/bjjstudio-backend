import * as z from "zod";
import { prisma } from "../lib/prisma";
import {
  criarParceiroSchema,
  atualizarParceiroSchema,
} from "./partners.schema";

type CriarParceiroInput = z.infer<typeof criarParceiroSchema>;
type AtualizarParceiroInput = z.infer<typeof atualizarParceiroSchema>;

export async function criarParceiro({ nome, faixa }: CriarParceiroInput) {
  return await prisma.partner.create({
    data: { nome, faixa },
  });
}

export async function listarParceiros() {
  return await prisma.partner.findMany();
}

export async function buscarParceiroPorId(id: string) {
  return await prisma.partner.findUnique({
    where: { id },
  });
}

export async function deletarParceiroPorId(id: string) {
  return await prisma.partner.delete({
    where: { id },
  });
}

export async function atualizarParceiro(
  id: string,
  dados: AtualizarParceiroInput,
) {
  return await prisma.partner.update({
    where: { id },
    data: { ...dados },
  });
}
