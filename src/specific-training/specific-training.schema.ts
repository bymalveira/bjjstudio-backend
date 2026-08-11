import * as z from "zod"; // Importa a biblioteca Zod para schemas de validação
import { Position } from "../../generated/prisma/enums"; // Importa o enum Position gerado pelo Prisma ORM

export const criarEspecificoSchema = z.object({ // Declara e exporta o schema Zod para criação de treinos específicos
  guardaTrabalhada: z.enum(Position), // Valida que a guarda trabalhada deve corresponder a um valor válido do enum Position
  passagemTrabalhada: z.string(), // Valida que a passagem trabalhada deve ser uma string obrigatória
  funcionou: z.boolean(), // Valida que a propriedade 'funcionou' deve ser um booleano (true/false)
  nota: z.string().optional(), // Valida que a observação/nota é opcional e, se presente, deve ser string
  parceiroId: z.string(), // Valida que o ID do parceiro de treino é uma string obrigatória
  trainingSessionId: z.string(), // Valida que o ID da sessão de treino vinculada é uma string obrigatória
}); // Fecha a declaração do objeto criarEspecificoSchema

export const atualizarEspecificoSchema = criarEspecificoSchema.partial(); // Cria o schema de atualização parcial tornando todas as propriedades opcionais

