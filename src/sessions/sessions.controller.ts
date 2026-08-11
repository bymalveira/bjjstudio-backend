import { type Request, type Response, type NextFunction } from "express"; // Importa as tipagens HTTP do Express
import { // Importa os serviços do recurso de sessões de treino
  criarSessao, // Serviço para criar sessão
  listarSessoes, // Serviço para listar sessões
  atualizarSessao, // Serviço para atualizar sessão
  buscarSessaoPorId, // Serviço para buscar sessão por ID
  deletarSessaoPorId, // Serviço para deletar sessão por ID
} from "./sessions.service"; // Módulo de origem dos serviços de sessão

export async function criarSessaoController( // Controller para criação de sessões de treino
  req: Request, // Objeto com os dados da requisição HTTP
  res: Response, // Objeto para resposta HTTP
  next: NextFunction, // Função next para manipuladores subsequentes
) { // Início do corpo da função criarSessaoController
  const data = (req as any).validatedData; // Recupera os dados validados anexados ao objeto req pelo middleware de validação

  const sessao = await criarSessao(data); // Chama o serviço para persistir a nova sessão com os dados validados

  return res.status(201).json(sessao); // Responde com código HTTP 201 (Created) e o objeto da sessão em JSON
} // Fim da função criarSessaoController

export async function listarSessoesController( // Controller para listagem das sessões de treino
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início do corpo da função listarSessoesController
  const sessoes = await listarSessoes(); // Chama o serviço para retornar a lista de todas as sessões de treino

  return res.status(200).json(sessoes); // Responde com código HTTP 200 (OK) e a lista em formato JSON
} // Fim da função listarSessoesController

export async function atualizarSessaoController( // Controller para alteração dos dados de uma sessão de treino
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início do corpo da função atualizarSessaoController
  const params = req.params; // Extrai o dicionário de parâmetros da URL
  const id = params.id; // Isola o identificador da sessão enviado na rota

  if (typeof id !== "string") { // Valida se o tipo da variável id é uma string válida
    return res.status(400).json({ error: "id invalido" }); // Retorna código HTTP 400 (Bad Request) se a validação falhar
  } // Fim da verificação do ID

  const date = (req as any).validatedData; // Extrai os dados atualizados que foram previamente validados pelo middleware (variável nomeada como date)

  const update = await atualizarSessao(id, date); // Invoca a atualização no serviço fornecendo o ID e os novos dados

  return res.status(200).json(update); // Responde com código HTTP 200 (OK) e os dados atualizados em formato JSON
} // Fim da função atualizarSessaoController

export async function buscarSessaoPorIdController( // Controller para recuperar os detalhes de uma sessão pelo ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início do corpo da função buscarSessaoPorIdController
  const params = req.params; // Obtém os parâmetros da rota HTTP
  const id = params.id; // Isola o valor do id da sessão

  if (typeof id !== "string") { // Verifica se a variável id é do tipo string
    return res.status(400).json({ error: "id invalido" }); // Responde com erro HTTP 400 se não for uma string válida
  } // Fim da verificação de id

  const session = await buscarSessaoPorId(id); // Invoca o serviço de busca por ID incluindo os relacionamentos

  if (session === null || session === undefined) { // Verifica se nenhuma sessão de treino foi encontrada
    return res.status(404).json({ error: "Erro ao buscar sessão" }); // Responde com erro HTTP 404 (Not Found) se não existir
  } // Fim do teste de inexistência da sessão

  return res.status(200).json(session); // Responde com código HTTP 200 (OK) enviando os dados completos da sessão encontrada
} // Fim da função buscarSessaoPorIdController

export async function deletarSessaoPorIdController( // Controller para remoção de uma sessão de treino por ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início do corpo da função deletarSessaoPorIdController
  const params = req.params; // Obtém a lista de parâmetros de caminho
  const id = params.id; // Extrai a variável id

  if (typeof id !== "string") { // Valida o formato do id
    return res.status(400).json({ error: "id invalido" }); // Retorna resposta de erro 400 em formato JSON
  } // Fim da checagem do ID

  const deletedSession = await deletarSessaoPorId(id); // Invoca o serviço para deletar o registro da sessão no banco de dados

  return res.status(200).json(deletedSession); // Retorna a resposta HTTP status 200 (OK) com os dados da sessão excluída
} // Fim da função deletarSessaoPorIdController

