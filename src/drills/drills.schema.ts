import * as z from "zod";

export const criarDrillSchema = z.object({
  tecnica: z.string(),
  repeticoes: z.int(),
  tempo: z.number(),
  nota: z.string().optional(),
  trainingSessionId: z.string(),
});

export const atualizarDrillSchema = criarDrillSchema.partial();
