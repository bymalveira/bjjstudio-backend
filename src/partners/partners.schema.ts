import * as z from "zod"; // Importa a biblioteca Zod para schemas de validação
import { Belts } from "../../generated/prisma/enums"; // Importa o enum Belts gerado pelo Prisma com as faixas de Jiu-Jitsu

export const criarParceiroSchema = z.object({ // Declara e exporta o schema Zod para criação de um parceiro de treino
  nome: z.string(), // Valida que a propriedade 'nome' deve ser uma string obrigatória
  faixa: z.enum(Belts), // Valida que a propriedade 'faixa' deve ser um dos valores válidos do enum Belts
}); // Fecha a definição do objeto criarParceiroSchema

export const atualizarParceiroSchema = criarParceiroSchema.partial(); // Cria o schema de atualização tornando todas as propriedades de criarParceiroSchema opcionais

