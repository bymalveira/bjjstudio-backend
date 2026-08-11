import { prisma } from "../lib/prisma";

export async function passagensPorGuarda() {
  return await prisma.sparringRound.groupBy({
    by: ["posicaoInicial"],
    where: { resultado: "FUI_PASSADO" },
    _count: true,
  });
}

export async function historicoContraParceiro(parceiroId: string) {
  return await prisma.sparringRound.groupBy({
    by: ["resultado"],
    where: { parceiroId },
    _count: true,
  });
}

export async function contarDrillsPorPeriodo(dataInicio: Date, dataFim: Date) {
  return await prisma.drill.count({
    where: {
      trainingSession: {
        data: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
    },
  });
}
