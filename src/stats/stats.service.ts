import { prisma } from "../lib/prisma"; // Importa a instância do Prisma Client para interagir com o banco de dados

export async function passagensPorGuarda() { // Função assíncrona para agrupar e contar quantas vezes o usuário teve a guarda passada por posição inicial
  return await prisma.sparringRound.groupBy({ // Chama o método groupBy da tabela sparringRound no Prisma
    by: ["posicaoInicial"], // Agrupa os resultados pela posição inicial do sparring
    where: { resultado: "FUI_PASSADO" }, // Filtra apenas as lutas onde o resultado foi "FUI_PASSADO"
    _count: true, // Habilita a contagem do total de ocorrências em cada agrupamento
  }); // Fecha a chamada da função groupBy
} // Fecha a função passagensPorGuarda

export async function historicoContraParceiro(parceiroId: string) { // Função assíncrona para obter o histórico de resultados contra um parceiro específico
  return await prisma.sparringRound.groupBy({ // Executa o método groupBy na tabela sparringRound
    by: ["resultado"], // Agrupa os registros pelo tipo de resultado obtido
    where: { parceiroId }, // Filtra os sparrings realizados com o parceiro indicado pelo ID
    _count: true, // Conta a quantidade de rounds para cada resultado
  }); // Fecha a chamada da função groupBy
} // Fecha a função historicoContraParceiro

export async function contarDrillsPorPeriodo(dataInicio: Date, dataFim: Date) { // Função assíncrona para contar os drills realizados dentro de um intervalo de datas
  return await prisma.drill.count({ // Executa a contagem total de registros na tabela drill
    where: { // Cláusula de filtro WHERE
      trainingSession: { // Filtra com base na relação com a sessão de treino (trainingSession)
        data: { // Filtra pela propriedade data da sessão de treino
          gte: dataInicio, // Data maior ou igual (Greater Than or Equal) à dataInicio
          lte: dataFim, // Data menor ou igual (Less Than or Equal) à dataFim
        }, // Fecha a condição da data
      }, // Fecha a condição da trainingSession
    }, // Fecha a cláusula where
  }); // Fecha a chamada do método count
} // Fecha a função contarDrillsPorPeriodo

