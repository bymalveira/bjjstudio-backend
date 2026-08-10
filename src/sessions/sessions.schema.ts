import * as z from "zod";

export const criarSessaoSchema = z.object({
  local: z.string(),
  professor: z.string(),
  duracao: z.number(),
  notaGeral: z.number(),
  data: z.string(),
});

export const atualizarSessaoSchema = criarSessaoSchema.partial();
