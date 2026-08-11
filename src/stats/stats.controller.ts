import type { Request, Response, NextFunction } from "express"; // Importa as tipagens Request, Response e NextFunction do Express
import { // Importa os serviços do recurso de estatísticas
  contarDrillsPorPeriodo, // Serviço para obter total de drills em um intervalo de datas
  historicoContraParceiro, // Serviço para obter histórico contra um determinado parceiro
  passagensPorGuarda, // Serviço para buscar estatísticas de passagens de guarda sofridas
} from "./stats.service"; // Módulo de origem dos serviços estatísticos

export async function passagensPorGuardaController( // Controller para retornar contagem de passagens por guarda
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next para manipular erros
) { // Início do corpo da função passagensPorGuardaController
  const passings = await passagensPorGuarda(); // Executa o serviço de consulta agrupada por posição de guarda passada

  return res.status(200).json(passings); // Responde com o status HTTP 200 (OK) enviando os dados em JSON
} // Fim da função passagensPorGuardaController

export async function historicoContraParceiroController( // Controller para retornar histórico de vitórias/derrotas contra um parceiro
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next
) { // Início da função historicoContraParceiroController
  const params = req.params; // Extrai o dicionário de parâmetros da URL
  const id = params.id; // Isola o identificador id do parceiro

  if (typeof id !== "string") { // Valida se o ID fornecido é uma string válida
    return res.status(400).json({ error: "id invalido" }); // Retorna resposta HTTP 400 (Bad Request) se for inválido
  } // Fim da validação do ID

  const history = await historicoContraParceiro(id); // Executa o serviço de busca por histórico utilizando o ID do parceiro

  if (history.length === 0) { // Verifica se a lista de histórico retornada está vazia
    return res // Retorna objeto de resposta encadeado
      .status(404) // Define o status HTTP como 404 (Not Found)
      .json({ error: "historico indusponivel/vazio para esse parceiro" }); // Envia mensagem em JSON informando que o histórico é vazio
  } // Fim da verificação de histórico vazio

  return res.status(200).json(history); // Retorna HTTP 200 (OK) com o histórico de sparrings contra o parceiro
} // Fim da função historicoContraParceiroController

export async function contarDrillsPorPeriodoController( // Controller para retornar a quantidade de drills realizados em determinado intervalo
  req: Request, // Objeto de requisição HTTP
  res: Response, // Objeto de resposta HTTP
  next: NextFunction, // Função next para repassar exceções
) { // Início da função contarDrillsPorPeriodoController
  try { // Bloco try para capturar exceções durante o processamento das datas e consulta
    const { inicio, fim } = req.query; // Extrai os parâmetros de consulta URL 'inicio' e 'fim' (query params)

    if (typeof inicio !== "string" || typeof fim !== "string") { // Valida se ambos os parâmetros foram enviados como strings
      return res.status(400).json({ // Retorna HTTP 400 em caso de ausência ou formato incorreto
        error: "inicio e fim são obrigatórios", // Mensagem explicativa de parâmetros obrigatórios
      }); // Fecha o envio da resposta JSON
    } // Fim da validação de presença dos parâmetros de query

    const dataInicio = new Date(inicio); // Converte a string inicio para o objeto Date do JavaScript
    const dataFim = new Date(fim); // Converte a string fim para o objeto Date do JavaScript

    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) { // Valida se alguma das datas geradas resulta em 'Invalid Date'
      return res.status(400).json({ // Retorna status HTTP 400 (Bad Request) se alguma data for inválida
        error: "Formato de data invalido", // Mensagem indicando formato de data inválido
      }); // Fecha o envio do erro JSON
    } // Fim da validação das instâncias de data

    const drills = await contarDrillsPorPeriodo(dataInicio, dataFim); // Chama o serviço passando as datas convertidas para obter a contagem

    return res.status(200).json(drills); // Retorna o status HTTP 200 (OK) enviando a contagem de drills
  } catch (error) { // Bloco catch que captura eventuais exceções ocorridas no try
    next(error); // Encaminha o erro capturado para o middleware global de erros do Express
  } // Fim do bloco catch
} // Fim da função contarDrillsPorPeriodoController

