import { prisma } from "../lib/prisma"; // Importa o cliente configurado do Prisma para acesso ao banco
import * as z from "zod"; // Importa a biblioteca Zod para trabalhar com os tipos inferidos
import { criarSessaoSchema, atualizarSessaoSchema } from "./sessions.schema"; // Importa os schemas de criação e atualização de sessões de treino

type CriarSessaoInput = z.infer<typeof criarSessaoSchema>; // Infere o tipo estático para o objeto de dados de criação da sessão
type AtualizarSessaoInput = z.infer<typeof atualizarSessaoSchema>; // Infere o tipo estático para o objeto de dados de atualização da sessão

export async function criarSessao({ // Exporta a função do serviço para persistir uma nova sessão de treino
  local, // Parâmetro do local da academia/treino
  professor, // Parâmetro com o nome do professor responsável
  duracao, // Duração da sessão em minutos
  notaGeral, // Nota geral da sessão de treino
  data, // Data da sessão de treino
}: CriarSessaoInput) { // Tipo de entrada inferido do schema Zod
  return await prisma.trainingSession.create({ // Chama o método create do Prisma na tabela trainingSession
    data: { local, professor, duracao, notaGeral, data }, // Define os dados a serem gravados
  }); // Fecha a chamada da função create
} // Fecha a função criarSessao

export async function listarSessoes() { // Função do serviço para listar todas as sessões de treino
  return await prisma.trainingSession.findMany(); // Busca e retorna todos os registros da tabela trainingSession
} // Fecha a função listarSessoes

export async function buscarSessaoPorId(id: string) { // Função para buscar uma sessão específica pelo seu ID único
  return await prisma.trainingSession.findUnique({ // Invoca findUnique na tabela trainingSession do Prisma
    where: { id }, // Filtra pelo ID informado
    include: { // Inclui os relacionamentos da sessão na resposta
      drills: true, // Traz a lista de drills vinculados à sessão de treino
      sparrings: true, // Traz a lista de sparrings/lutas vinculados a esta sessão
      specificTrainings: true, // Traz a lista de treinos específicos associados
    }, // Fecha o bloco include
  }); // Fecha a chamada da função findUnique
} // Fecha a função buscarSessaoPorId

export async function deletarSessaoPorId(id: string) { // Função para remover uma sessão de treino por ID
  return await prisma.trainingSession.delete({ // Invoca o método delete da tabela trainingSession
    where: { id }, // Filtra o registro a ser removido pelo ID
  }); // Fecha a chamada da função delete
} // Fecha a função deletarSessaoPorId

export async function atualizarSessao(id: string, dados: AtualizarSessaoInput) { // Função para atualizar os dados de uma sessão existente
  return await prisma.trainingSession.update({ // Invoca o método update da tabela trainingSession no Prisma
    where: { id }, // Especifica o ID do registro que será atualizado
    data: { ...dados }, // Aplica os novos dados informados no objeto dados
  }); // Fecha a chamada da função update
} // Fecha a função atualizarSessao

