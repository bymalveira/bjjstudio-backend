import * as z from "zod";
import { Belts } from "../../generated/prisma/enums";

export const criarParceiroSchema = z.object({
  nome: z.string(),
  faixa: z.enum(Belts),
});

export const atualizarParceiroSchema = criarParceiroSchema.partial();
