import { type Request, type Response, type NextFunction } from "express"; // Importa os tipos HTTP Request, Response e NextFunction do Express
import { // Importa as funções de serviço que cuidam da regra de negócio e banco de dados dos parceiros
  listarParceiros, // Serviço para listar parceiros
  criarParceiro, // Serviço para criar um parceiro
  atualizarParceiro, // Serviço para atualizar um parceiro
  buscarParceiroPorId, // Serviço para buscar parceiro por ID
  deletarParceiroPorId, // Serviço para deletar parceiro por ID
} from "./partners.service"; // Caminho do módulo de serviço de parceiros

export async function criarParceiroController( // Handler do controller para criar parceiro
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next para encadear erros/middlewares
) { // Início da função criarParceiroController
  const data = (req as any).validatedData; // Extrai os dados já validados do middleware de validação anterior

  const parceiro = await criarParceiro(data); // Executa o serviço de criação de parceiro passando os dados recebidos

  return res.status(201).json(parceiro); // Responde com o status HTTP 201 (Created) e o objeto do parceiro criado em JSON
} // Fim da função criarParceiroController

export async function listarParceirosController( // Handler do controller para listar todos os parceiros
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função listarParceirosController
  const parceiros = await listarParceiros(); // Executa o serviço para listar todos os parceiros no banco

  return res.status(200).json(parceiros); // Responde com status HTTP 200 (OK) e a lista de parceiros em JSON
} // Fim da função listarParceirosController

export async function atualizarParceiroController( // Handler do controller para atualizar parceiro
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função atualizarParceiroController
  const params = req.params; // Obtém os parâmetros enviados na URL
  const id = params.id; // Extrai o parâmetro id da URL

  if (typeof id !== "string") { // Verifica se o ID fornecido não é uma string válida
    return res.status(400).json({ error: "id invalido" }); // Retorna HTTP 400 (Bad Request) se o ID for inválido
  } // Fim da verificação do ID

  const data = (req as any).validatedData; // Extrai os dados de atualização validados pelo middleware

  const update = await atualizarParceiro(id, data); // Chama o serviço para atualizar o parceiro com o ID e os novos dados

  return res.status(200).json(update); // Responde com status HTTP 200 (OK) e os dados do parceiro atualizados
} // Fim da função atualizarParceiroController

export async function buscarParceiroPorIdController( // Handler do controller para buscar parceiro por ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função buscarParceiroPorIdController
  const params = req.params; // Obtém os parâmetros da URL
  const id = params.id; // Extrai o parâmetro id

  if (typeof id !== "string") { // Valida se o id é uma string
    return res.status(400).json({ error: "id invalido" }); // Retorna erro 400 se o formato for inválido
  } // Fim do bloco de validação de ID

  const parceiro = await buscarParceiroPorId(id); // Chama o serviço para obter o parceiro do banco

  if (parceiro === null || parceiro === undefined) { // Verifica se nenhum parceiro foi encontrado
    return res.status(404).json({ error: "Erro ao buscar parceiro" }); // Retorna erro HTTP 404 (Not Found) se não existir
  } // Fim da verificação de parceiro inexistente

  return res.status(200).json(parceiro); // Retorna HTTP 200 (OK) com os dados do parceiro encontrado
} // Fim da função buscarParceiroPorIdController

export async function deletarParceiroPorIdController( // Handler do controller para deletar parceiro por ID
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função deletarParceiroPorIdController
  try { // Bloco try para capturar exceções durante a exclusão
    const params = req.params; // Extrai o objeto params da requisição
    const id = params.id; // Obtém o parâmetro id

    if (typeof id !== "string") { // Valida se o ID fornecido é uma string
      return res.status(400).json({ error: "id invalido" }); // Retorna erro HTTP 400 se for inválido
    } // Fim da validação do ID

    const deletedPartner = await deletarParceiroPorId(id); // Executa a remoção do parceiro chamando o serviço

    return res.json(200).json(deletedPartner); // Retorna o parceiro deletado com resposta JSON
  } catch { // Captura exceções, como violações de chave estrangeira no banco
    return res // Retorna a resposta de erro para a requisição
      .status(409) // Define o código HTTP como 409 (Conflict)
      .json({ // Define o corpo da resposta em formato JSON
        error: // Propriedade da mensagem de erro
          "Não é possível excluir: existem sparrings ou treinos vinculados a este parceiro", // Mensagem explicativa da restrição de chave estrangeira
      }); // Fim da definição do objeto JSON de erro
  } // Fim do bloco catch
} // Fim da função deletarParceiroPorIdController

