import * as z from "zod";
import { SparringResult, Position } from "../../generated/prisma/enums";

export const criarSparringSchema = z.object({
  resultado: z.enum(SparringResult),
  posicaoInicial: z.enum(Position),
  posicaoFinal: z.enum(Position),
  tempo: z.number(),
  nota: z.string().optional(),
  parceiroId: z.string(),
  trainingSessionId: z.string(),
});
