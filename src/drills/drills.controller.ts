import type { Request, Response, NextFunction } from "express"; // Importa as definições de tipo Request, Response e NextFunction do módulo Express
import { // Importa os métodos de negócio do serviço de drills
  criarDrill, // Função para persistir novo drill
  listarDrills, // Função para buscar todos os drills
  atualizarDrill, // Função para atualizar um drill existente
  buscarDrillPorId, // Função para buscar um drill pelo ID
  deletarDrillPorId, // Função para remover um drill pelo ID
} from "./drills.service"; // Módulo contendo os serviços de drills

export async function criarDrillController( // Controller assíncrono encarregado do recebimento e criação de drills
  req: Request, // Parâmetro com os dados da requisição HTTP
  res: Response, // Parâmetro para construir e enviar a resposta HTTP
  next: NextFunction, // Função next para o fluxo de middleware do Express
) { // Início do corpo do controller criarDrillController
  const data = (req as any).validatedData; // Extrai o objeto de dados validados adicionado anteriormente pelo middleware de validação

  const drill = await criarDrill(data); // Invoca a função do serviço enviando os dados validados do drill

  return res.status(201).json(drill); // Retorna a resposta com status HTTP 201 (Created) e os dados do drill criado em formato JSON
} // Fim da função criarDrillController

export async function listarDrillsController( // Controller responsável por retornar todos os drills armazenados
  req: Request, // Objeto Request do Express
  res: Response, // Objeto Response do Express
  next: NextFunction, // Função NextFunction
) { // Início da função listarDrillsController
  const drills = await listarDrills(); // Executa o serviço que lista todos os drills no banco

  return res.status(200).json(drills); // Retorna resposta HTTP status 200 (OK) com o array de drills em formato JSON
} // Fim da função listarDrillsController

export async function atualizarDrillController( // Controller para gerenciar atualizações em registros de drills
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função atualizarDrillController
  const params = req.params; // Obtém o mapa de parâmetros da URL
  const id = params.id; // Extrai a propriedade id dos parâmetros da URL

  if (typeof id !== "string") { // Verifica se a variável id não é uma string válida
    return res.status(400).json({ error: "id invalido" }); // Retorna HTTP 400 (Bad Request) caso o ID seja inválido
  } // Fim do bloco de validação de tipo do ID
  const data = (req as any).validatedData; // Extrai os novos dados do drill validados via middleware

  const update = await atualizarDrill(id, data); // Executa o serviço de atualização enviando o ID e os novos dados

  return res.status(200).json(update); // Responde com o status HTTP 200 (OK) e a estrutura atualizada em formato JSON
} // Fim da função atualizarDrillController

export async function buscarDrillPorIdController( // Controller para localização de drill especificamente pelo ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função buscarDrillPorIdController
  const params = req.params; // Extrai o dicionário de parâmetros do caminho da requisição
  const id = params.id; // Isola o valor do parâmetro id

  if (typeof id !== "string") { // Checa a integridade do tipo do id
    return res.status(400).json({ error: "id invalido" }); // Responde com erro 400 caso o ID esteja inconsistente
  } // Fim do teste do id

  const drill = await buscarDrillPorId(id); // Chama o serviço para buscar o registro no banco pelo id informado

  if (drill === null || drill === undefined) { // Valida se a busca não retornou nenhum registro (resultado nulo ou indefinido)
    return res.status(404).json({ error: "Erro ao buscar drill" }); // Retorna o código HTTP 404 (Not Found) com mensagem explicativa em formato JSON
  } // Fim da checagem de existência do drill

  return res.json(200).json(drill); // Retorna a resposta HTTP 200 (OK) com o drill localizado (Nota: .json(200) pode ser ajustado para .status(200))
} // Fim da função buscarDrillPorIdController

export async function deletarDrillPorIdController( // Controller que orquestra o encerramento/exclusão de um drill
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função deletarDrillPorIdController
  const params = req.params; // Obtém os parâmetros contidos na rota da requisição
  const id = params.id; // Extrai o id a ser excluído

  if (typeof id !== "string") { // Confirma se o id extraído possui o tipo string
    return res.status(400).json({ error: "id invalido" }); // Retorna erro 400 se o id não for string
  } // Fim da checagem do ID

  const deletedDrill = await deletarDrillPorId(id); // Executa a remoção no banco chamando o serviço deletarDrillPorId

  return res.status(200).json(deletedDrill); // Envia resposta 200 (OK) acompanhada do objeto do drill que foi deletado
} // Fim da função deletarDrillPorIdController

