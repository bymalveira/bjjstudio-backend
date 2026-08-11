import * as z from "zod"; // Importa a biblioteca Zod para construção de schemas de validação

export const criarSessaoSchema = z.object({ // Declara e exporta o esquema Zod para a validação dos dados de uma nova sessão de treino
  local: z.string(), // Valida que o campo 'local' onde foi o treino é do tipo string e obrigatório
  professor: z.string(), // Valida que o campo 'professor' responsável pelo treino é do tipo string e obrigatório
  duracao: z.number(), // Valida que a 'duracao' do treino é do tipo number (em minutos) e obrigatória
  notaGeral: z.number(), // Valida que a 'notaGeral' de avaliação da sessão é do tipo number e obrigatória
  data: z.string(), // Valida que a 'data' do treino é uma string (representando a data formatada/ISO) e obrigatória
}); // Fecha a declaração do objeto criarSessaoSchema

export const atualizarSessaoSchema = criarSessaoSchema.partial(); // Declara o esquema de atualização tornando todos os atributos de criarSessaoSchema opcionais

