import { prisma } from "../lib/prisma"; // Importa a instância singleton do cliente do Prisma ORM
import * as z from "zod"; // Importa o Zod para trabalhar com a tipagem estática inferida dos schemas
import { criarDrillSchema, atualizarDrillSchema } from "./drills.schema"; // Importa os schemas Zod de criação e atualização de drills

type CriarDrillInput = z.infer<typeof criarDrillSchema>; // Infere o tipo de entrada para a criação de drill a partir do schema criarDrillSchema
type atualizarDrillInput = z.infer<typeof atualizarDrillSchema>; // Infere o tipo de entrada para a atualização de drill a partir do schema atualizarDrillSchema

export async function criarDrill({ // Exporta a função assíncrona do serviço responsável pela criação de um novo drill no banco
  tecnica, // Nome ou identificador da técnica praticada no drill
  repeticoes, // Número de repetições efetuadas
  tempo, // Duração em minutos ou segundos investidos no drill
  nota, // Anotações ou observações adicionais sobre o drill
  trainingSessionId, // ID da sessão de treino vinculada ao drill
}: CriarDrillInput) { // Define o tipo do parâmetro desestruturado
  return await prisma.drill.create({ // Chama o método create do Prisma na tabela drill
    data: { tecnica, repeticoes, tempo, nota, trainingSessionId }, // Passa os campos para a gravação no banco
  }); // Fecha a chamada da função create
} // Fecha a função criarDrill

export async function listarDrills() { // Função assíncrona para buscar todos os registros de drills cadastrados
  return await prisma.drill.findMany(); // Retorna todos os registros da tabela drill
} // Fecha a função listarDrills

export async function buscarDrillPorId(id: string) { // Função assíncrona para buscar um drill específico através de seu ID
  return await prisma.drill.findUnique({ // Consulta o registro único correspondente na tabela drill
    where: { id }, // Cláusula WHERE com a chave primária ID
  }); // Fecha a chamada da função findUnique
} // Fecha a função buscarDrillPorId

export async function deletarDrillPorId(id: string) { // Função assíncrona para deletar um registro de drill por seu ID
  return await prisma.drill.delete({ // Chama a operação delete da tabela drill no Prisma
    where: { id }, // Define qual ID deve ser excluído
  }); // Fecha a chamada da função delete
} // Fecha a função deletarDrillPorId

export async function atualizarDrill(id: string, dados: atualizarDrillInput) { // Função assíncrona para alterar os dados de um drill existente
  return await prisma.drill.update({ // Chama o método update do Prisma na tabela drill
    where: { id }, // Filtra o drill que será alterado pelo ID
    data: { ...dados }, // Aplica as novas propriedades contidas no parâmetro dados
  }); // Fecha a chamada da função update
} // Fecha a função atualizarDrill

