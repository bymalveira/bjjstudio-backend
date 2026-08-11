import * as z from "zod"; // Importa a biblioteca Zod para construção de schemas de validação
import { SparringResult, Position } from "../../generated/prisma/enums"; // Importa os enums SparringResult (vitória/derrota/etc) e Position (guarda/passagem/etc) do Prisma

export const criarSparringSchema = z.object({ // Declara e exporta o esquema Zod para validação da criação de um round de sparring
  resultado: z.enum(SparringResult), // Valida que o resultado deve corresponder a um dos valores do enum SparringResult
  posicaoInicial: z.enum(Position), // Valida que a posição inicial do sparring deve corresponder a um dos valores do enum Position
  posicaoFinal: z.enum(Position), // Valida que a posição final deve corresponder a um dos valores do enum Position
  tempo: z.number(), // Valida que a duração/tempo do sparring é do tipo number
  nota: z.string().optional(), // Valida que o campo de observação/nota é opcional e, se enviado, deve ser string
  parceiroId: z.string(), // Valida que o ID do parceiro de treino vinculado é uma string obrigatória
  trainingSessionId: z.string(), // Valida que o ID da sessão de treino vinculada é uma string obrigatória
}); // Fecha a declaração do objeto criarSparringSchema

export const atualizarSparringSchema = criarSparringSchema.partial(); // Declara o schema de atualização tornando todas as propriedades de criarSparringSchema opcionais

