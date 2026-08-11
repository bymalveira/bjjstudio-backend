import type { Request, Response, NextFunction } from "express"; // Importa os tipos da requisição e resposta do Express
import { // Importa as funções do serviço de treinos específicos
  criarEspecifico, // Serviço de criação
  listarEspecifico, // Serviço de listagem
  atualizarEspecifico, // Serviço de atualização
  buscarEspecificoPorId, // Serviço de busca por ID
  deletarEspecificoPorId, // Serviço de exclusão por ID
} from "./specific-training.service"; // Módulo contendo a lógica do serviço de treino específico

export async function criarEspecificoController( // Controller para gerenciar a criação de um treino específico
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início do corpo da função criarEspecificoController
  const data = (req as any).validatedData; // Recupera a estrutura dos dados validados pelo middleware

  const especifico = await criarEspecifico(data); // Executa o serviço de criação informando os dados validados

  return res.status(201).json(especifico); // Retorna a resposta com o código HTTP 201 (Created) e o objeto criado em formato JSON
} // Fim da função criarEspecificoController

export async function listarEspecificoController( // Controller para a listagem dos treinos específicos registrados
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função listarEspecificoController
  const especifico = await listarEspecifico(); // Invoca a função do serviço para listar todos os treinos específicos

  return res.status(200).json(especifico); // Retorna a resposta HTTP 200 (OK) com a lista em JSON
} // Fim da função listarEspecificoController

export async function buscarEspecificoPorIdController( // Controller para busca de um treino específico através de seu ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função buscarEspecificoPorIdController
  const params = req.params; // Obtém o mapa de parâmetros fornecidos na rota
  const id = params.id; // Extrai o id dos parâmetros

  if (typeof id !== "string") { // Valida se o formato do id é uma string válida
    return res.status(400).json({ error: "id invalido" }); // Retorna HTTP status 400 (Bad Request) se a validação falhar
  } // Fim da verificação do ID

  const especifico = await buscarEspecificoPorId(id); // Executa o serviço de busca por ID

  if (especifico === null || especifico === undefined) { // Verifica se o treino específico não foi localizado (resultado nulo ou undefined)
    return res.json(404).json({ error: "Erro ao buscar especifico" }); // Retorna a resposta com o código HTTP 404 de erro (Not Found)
  } // Fim da checagem de existência

  return res.status(200).json(especifico); // Retorna HTTP 200 (OK) com os dados do treino específico encontrado em formato JSON
} // Fim da função buscarEspecificoPorIdController

export async function atualizarEspecificoController( // Controller para manipular a atualização de um treino específico
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função atualizarEspecificoController
  const params = req.params; // Resgata parâmetros da rota HTTP
  const id = params.id; // Isola a propriedade id

  if (typeof id !== "string") { // Valida a tipagem da variável id
    return res.status(400).json({ error: "id invalido" }); // Retorna erro 400 caso o ID não seja uma string
  } // Fim da verificação de ID

  const data = (req as any).validatedData; // Extrai os dados atualizados que foram pré-validados

  const update = await atualizarEspecifico(id, data); // Invoca a função do serviço para atualizar o treino específico pelo ID

  return res.status(200).json(update); // Responde com código HTTP 200 (OK) e a estrutura atualizada
} // Fim da função atualizarEspecificoController

export async function deletarEspecificoPorIdController( // Controller para orquestrar a deleção de um treino específico por ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função deletarEspecificoPorIdController
  const params = req.params; // Obtém os parâmetros informados no caminho da URL
  const id = params.id; // Extrai o id

  if (typeof id !== "string") { // Checa a integridade do parâmetro id
    return res.status(400).json({ error: "id invalido" }); // Retorna mensagem de erro 400 em formato JSON
  } // Fim da validação do ID

  const deletedSpecific = await deletarEspecificoPorId(id); // Executa o serviço responsável por excluir o treino específico

  return res.status(200).json(deletedSpecific); // Responde com código HTTP status 200 (OK) e o registro que foi deletado
} // Fim da função deletarEspecificoPorIdController

