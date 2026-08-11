import { type Request, type Response, type NextFunction } from "express"; // Importa as definições de tipo do Express
import { // Importa os serviços associados ao sparring
  criarSparring, // Serviço para criar um sparring
  listarSparrings, // Serviço para listar sparrings
  atualizarSparring, // Serviço para atualizar um sparring
  buscarSparringPorId, // Serviço para buscar um sparring pelo ID
  deletarSparringPorId, // Serviço para remover um sparring pelo ID
} from "./sparring.service"; // Módulo contendo a lógica de banco de dados do sparring

export async function criarSparringController( // Handler do controller para inclusão de novos sparrings
  req: Request, // Objeto de requisição HTTP do Express
  res: Response, // Objeto de resposta HTTP do Express
  next: NextFunction, // Função next para middlewares
) { // Início do corpo da função criarSparringController
  const data = (req as any).validatedData; // Extrai o payload validado anexado pelo middleware ao objeto req

  const sparring = await criarSparring(data); // Executa a função do serviço repassando os dados de entrada validados

  return res.status(201).json(sparring); // Responde com código HTTP 201 (Created) e o objeto do sparring gravado em formato JSON
} // Fim da função criarSparringController

export async function listarSparringController( // Handler do controller para consulta de todos os sparrings
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função listarSparringController
  const sparrings = await listarSparrings(); // Chama o serviço para buscar os sparrings cadastrados

  return res.status(201).json(sparrings); // Retorna a resposta HTTP status 201 (Created) acompanhada da lista obtida
} // Fim da função listarSparringController

export async function atualizarSparringController( // Handler do controller para atualização de um sparring existente
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função atualizarSparringController
  const params = req.params; // Obtém o objeto de parâmetros presentes no caminho da requisição
  const id = params.id; // Extrai o id do parâmetro da rota

  if (typeof id !== "string") { // Checa se o ID informado é uma string válida
    return res.status(400).json({ error: "id invalido" }); // Retorna HTTP 400 (Bad Request) se a validação falhar
  } // Fim da validação do tipo do ID

  const data = (req as any).validatedData; // Extrai a carga de dados atualizada e pré-validada

  const update = await atualizarSparring(id, data); // Executa o serviço de atualização de sparring com o ID e os novos dados

  return res.status(200).json(update); // Responde com código HTTP 200 (OK) e o objeto atualizado
} // Fim da função atualizarSparringController

export async function buscarSparringPorIdController( // Handler do controller para consulta individualizada de sparring
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função buscarSparringPorIdController
  const params = req.params; // Resgata parâmetros da requisição HTTP
  const id = params.id; // Isola a propriedade id do parâmetro da URL

  if (typeof id !== "string") { // Verifica se a variável id possui tipo string
    return res.status(400).json({ error: "id invalido" }); // Retorna resposta de erro 400 em caso de inconsistência
  } // Fim da validação do ID

  const sparring = await buscarSparringPorId(id); // Consulta a existência do sparring através do serviço

  if (sparring === null || sparring === undefined) { // Checa se nenhum registro de sparring foi localizado no banco
    return res.status(404).json({ error: "Erro ao buscar sparring" }); // Responde com o código HTTP 404 (Not Found) se for inexistente
  } // Fim do tratamento de registro não encontrado

  return res.status(200).json(sparring); // Retorna HTTP status 200 (OK) com os dados do sparring localizado
} // Fim da função buscarSparringPorIdController

export async function deletarSparringPorIdController( // Handler do controller para exclusão de um registro de sparring
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função deletarSparringPorIdController
  const params = req.params; // Extrai o dicionário de parâmetros da rota
  const id = params.id; // Extrai o ID do parâmetro

  if (typeof id !== "string") { // Valida a tipagem do ID
    return res.status(400).json({ error: "id invalido" }); // Retorna o erro 400 se o ID for inválido
  } // Fim da validação do ID

  const deletedSparring = await deletarSparringPorId(id); // Invoca a operação de remoção no serviço

  return res.status(200).json(deletedSparring); // Retorna resposta HTTP 200 (OK) contendo o registro do sparring deletado
} // Fim da função deletarSparringPorIdController

