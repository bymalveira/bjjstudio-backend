import * as z from "zod"; // Importa a biblioteca Zod para inferência de tipos
import { prisma } from "../lib/prisma"; // Importa a instância do cliente Prisma para acesso ao banco de dados
import { // Importa os schemas de validação de parceiro
  criarParceiroSchema, // Schema usado para a criação de um parceiro
  atualizarParceiroSchema, // Schema usado para a atualização de um parceiro
} from "./partners.schema"; // Caminho relativo do arquivo de schemas de parceiro

type CriarParceiroInput = z.infer<typeof criarParceiroSchema>; // Define o tipo TypeScript de entrada derivado do criarParceiroSchema
type AtualizarParceiroInput = z.infer<typeof atualizarParceiroSchema>; // Define o tipo TypeScript de entrada derivado do atualizarParceiroSchema

export async function criarParceiro({ nome, faixa }: CriarParceiroInput) { // Função assíncrona do serviço para criar um parceiro de treino
  return await prisma.partner.create({ // Chama a operação de criação na tabela partner no Prisma e retorna a promessa
    data: { nome, faixa }, // Passa o nome e a faixa a serem inseridos
  }); // Fecha a chamada da função create
} // Fecha a função criarParceiro

export async function listarParceiros() { // Função assíncrona do serviço para obter todos os parceiros
  return await prisma.partner.findMany(); // Executa o método findMany na tabela partner do Prisma e retorna a lista de parceiros
} // Fecha a função listarParceiros

export async function buscarParceiroPorId(id: string) { // Função assíncrona do serviço para obter um parceiro pelo seu ID único
  return await prisma.partner.findUnique({ // Executa findUnique na tabela partner
    where: { id }, // Filtra a busca pelo ID fornecido no parâmetro
  }); // Fecha a chamada da função findUnique
} // Fecha a função buscarParceiroPorId

export async function deletarParceiroPorId(id: string) { // Função assíncrona do serviço para deletar um parceiro por ID
  return await prisma.partner.delete({ // Executa o método delete na tabela partner no Prisma
    where: { id }, // Identifica qual registro de parceiro deve ser removido pelo ID
  }); // Fecha a chamada do método delete
} // Fecha a função deletarParceiroPorId

export async function atualizarParceiro( // Função assíncrona do serviço para atualizar um parceiro existente
  id: string, // Recebe o ID do parceiro a ser atualizado
  dados: AtualizarParceiroInput, // Recebe o objeto com os novos dados de alteração
) { // Início do corpo da função atualizarParceiro
  return await prisma.partner.update({ // Chama o método update do Prisma na tabela partner
    where: { id }, // Especifica o registro a ser atualizado pelo ID
    data: { ...dados }, // Espalha as propriedades fornecidas no objeto dados para atualizar a tabela
  }); // Fecha a chamada da função update
} // Fecha a função atualizarParceiro

