import * as z from "zod";
import { Position } from "../../generated/prisma/enums";

export const criarEspecificoSchema = z.object({
  guardaTrabalhada: z.enum(Position),
  passagemTrabalhada: z.string(),
  funcionou: z.boolean(),
  nota: z.string().optional(),
  parceiroId: z.string(),
  trainingSessionId: z.string(),
});
