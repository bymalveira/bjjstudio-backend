import * as z from "zod"; // Importa o namespace Zod para a construção de esquemas de validação de dados

export const criarDrillSchema = z.object({ // Define e exporta a constante criarDrillSchema contendo o objeto de validação Zod para novos drills
  tecnica: z.string(), // Valida que a propriedade 'tecnica' deve ser uma string obrigatória
  repeticoes: z.int(), // Valida que a propriedade 'repeticoes' deve ser um número inteiro
  tempo: z.number(), // Valida que a propriedade 'tempo' deve ser um número (flutuante ou inteiro)
  nota: z.string().optional(), // Valida que a propriedade 'nota' é opcional e, se presente, deve ser uma string
  trainingSessionId: z.string(), // Valida que a propriedade 'trainingSessionId' (ID da sessão de treino vinculada) é uma string obrigatória
}); // Encerra o objeto de validação criarDrillSchema

export const atualizarDrillSchema = criarDrillSchema.partial(); // Define e exporta o schema de atualização tornando todas as propriedades de criarDrillSchema opcionais

