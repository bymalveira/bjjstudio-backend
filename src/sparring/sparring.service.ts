import * as z from "zod"; // Importa o Zod para inferência de tipos
import { // Importa os esquemas de validação de sparring
  criarSparringSchema, // Schema de criação de sparring
  atualizarSparringSchema, // Schema de atualização de sparring
} from "./sparring.schema"; // Módulo de origem dos schemas
import { prisma } from "../lib/prisma"; // Importa a instância do cliente Prisma

type SparringRoundInput = z.infer<typeof criarSparringSchema>; // Define a tipagem estática para entrada de criação de sparring
type AtualizarSparringInput = z.infer<typeof atualizarSparringSchema>; // Define a tipagem estática para entrada de atualização de sparring

export async function criarSparring({ // Função do serviço para criar um registro de round de sparring
  resultado, // Resultado da luta/round (ex: submissão, pontos, etc)
  posicaoInicial, // Posição inicial no início do round
  posicaoFinal, // Posição em que o round terminou
  tempo, // Tempo gasto no round
  nota, // Observação opcional sobre o round
  parceiroId, // ID do parceiro com quem foi feito o sparring
  trainingSessionId, // ID da sessão de treino a que este sparring pertence
}: SparringRoundInput) { // Tipo de dados de entrada desestruturado
  return await prisma.sparringRound.create({ // Chama o método de criação na tabela sparringRound do Prisma
    data: { // Objeto com os campos para gravação no banco
      resultado, // Propriedade resultado
      posicaoInicial, // Propriedade posicaoInicial
      posicaoFinal, // Propriedade posicaoFinal
      tempo, // Propriedade tempo
      nota, // Propriedade nota
      parceiroId, // Propriedade parceiroId
      trainingSessionId, // Propriedade trainingSessionId
    }, // Fim do objeto data
  }); // Fecha a chamada da função create
} // Fecha a função criarSparring

export async function listarSparrings() { // Função do serviço para obter a lista de todos os sparrings
  return await prisma.sparringRound.findMany(); // Busca e retorna todos os registros da tabela sparringRound
} // Fecha a função listarSparrings

export async function buscarSparringPorId(id: string) { // Função do serviço para obter um sparring específico por ID
  return await prisma.sparringRound.findUnique({ // Busca o registro único na tabela sparringRound
    where: { id }, // Condição WHERE filtrando pelo ID único
  }); // Fecha a chamada de findUnique
} // Fecha a função buscarSparringPorId

export async function atualizarSparring( // Função do serviço para atualizar um round de sparring
  id: string, // ID do sparring a ser modificado
  dados: AtualizarSparringInput, // Objeto contendo os dados alterados
) { // Início da função atualizarSparring
  return await prisma.sparringRound.update({ // Chama o método update da tabela sparringRound no Prisma
    where: { id }, // Filtra o registro pelo ID
    data: { ...dados }, // Aplica as atualizações espalhando a estrutura dados
  }); // Fecha a chamada da função update
} // Fecha a função atualizarSparring

export async function deletarSparringPorId(id: string) { // Função do serviço para deletar um round de sparring por ID
  return await prisma.sparringRound.delete({ // Chama a função de deleção da tabela sparringRound no Prisma
    where: { id }, // Define qual ID será excluído
  }); // Fecha a chamada de delete
} // Fecha a função deletarSparringPorId

