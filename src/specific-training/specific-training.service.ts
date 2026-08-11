import * as z from "zod"; // Importa o módulo Zod para lidar com tipos inferidos
import { prisma } from "../lib/prisma"; // Importa o cliente estático do Prisma
import { // Importa os esquemas de validação de treino específico
  criarEspecificoSchema, // Schema Zod de criação
  atualizarEspecificoSchema, // Schema Zod de atualização
} from "./specific-training.schema"; // Módulo de origem dos schemas

type CriarEspecificoInput = z.infer<typeof criarEspecificoSchema>; // Define a tipagem estática de criação derivada do Zod
type AtualizarEspecificoInput = z.infer<typeof atualizarEspecificoSchema>; // Define a tipagem estática de atualização derivada do Zod

export async function criarEspecifico({ // Função de serviço para persistir um novo treino específico
  guardaTrabalhada, // Posição de guarda treinada no treino específico
  passagemTrabalhada, // Técnica de passagem de guarda exercitada
  funcionou, // Booleano indicando se a técnica obteve sucesso
  nota, // Observações gerais opcionais
  parceiroId, // ID do parceiro de treino envolvido
  trainingSessionId, // ID da sessão de treino vinculada
}: CriarEspecificoInput) { // Tipo de entrada desestruturado
  return await prisma.specificTraining.create({ // Chama a criação do registro na tabela specificTraining do Prisma
    data: { // Objeto com os campos enviados ao banco
      guardaTrabalhada, // Guarda trabalhada
      passagemTrabalhada, // Passagem trabalhada
      funcionou, // Indicador de sucesso
      nota, // Nota/observação
      parceiroId, // ID do parceiro
      trainingSessionId, // ID da sessão
    }, // Fim do objeto data
  }); // Fecha a chamada do método create
} // Fecha a função criarEspecifico

export async function listarEspecifico() { // Função do serviço para retornar todos os treinos específicos
  return await prisma.specificTraining.findMany(); // Executa o método findMany na tabela specificTraining do Prisma
} // Fecha a função listarEspecifico

export async function buscarEspecificoPorId(id: string) { // Função para buscar um treino específico pelo ID
  return await prisma.specificTraining.findUnique({ // Executa o método findUnique na tabela especificando o ID
    where: { id }, // Cláusula de seleção WHERE pelo ID
  }); // Fecha a chamada da função findUnique
} // Fecha a função buscarEspecificoPorId

export async function atualizarEspecifico( // Função do serviço para alterar os dados de um treino específico
  id: string, // ID do treino específico a ser alterado
  dados: AtualizarEspecificoInput, // Novos dados de atualização
) { // Início da função atualizarEspecifico
  return await prisma.specificTraining.update({ // Chama o método update na tabela specificTraining no Prisma
    where: { id }, // Filtra o registro pelo ID
    data: { ...dados }, // Aplica os novos dados espalhando o objeto dados
  }); // Fecha a chamada da função update
} // Fecha a função atualizarEspecifico

export async function deletarEspecificoPorId(id: string) { // Função do serviço para excluir um treino específico por ID
  return await prisma.specificTraining.delete({ // Invoca o método delete da tabela specificTraining
    where: { id }, // Seleciona o registro que possui o ID fornecido
  }); // Fecha a chamada da função delete
} // Fecha a função deletarEspecificoPorId

