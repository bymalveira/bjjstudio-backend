-- CreateEnum
CREATE TYPE "SparringResult" AS ENUM ('FUI_PASSADO', 'PASSEI', 'FINALIZEI', 'FUI_FINALIZADO', 'NENHUM');

-- CreateEnum
CREATE TYPE "Belts" AS ENUM ('BRANCA', 'CINZA', 'AMARELA', 'LARANJA', 'VERDE', 'AZUL', 'ROXA', 'MARROM', 'PRETA');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('EM_PE', 'GUARDA_FECHADA', 'GUARDA_ABERTA', 'MEIA_GUARDA', 'CINQUENTA_CINQUENTA', 'DE_LA_RIVA', 'GUARDA_ARANHA', 'GUARDA_BORBOLETA', 'GUARDA_X', 'MONTADA', 'QUATRO_APOIOS', 'LATERAL', 'NORTE_SUL', 'COSTAS');

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "notaGeral" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drill" (
    "id" TEXT NOT NULL,
    "tecnica" TEXT NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "tempo" INTEGER NOT NULL,
    "nota" TEXT,
    "trainingSessionId" TEXT NOT NULL,

    CONSTRAINT "Drill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SparringRound" (
    "id" TEXT NOT NULL,
    "resultado" "SparringResult" NOT NULL,
    "posicaoInicial" "Position" NOT NULL,
    "posicaoFinal" "Position" NOT NULL,
    "tempo" INTEGER NOT NULL,
    "nota" TEXT,
    "parceiroId" TEXT NOT NULL,
    "trainingSessionId" TEXT NOT NULL,

    CONSTRAINT "SparringRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificTraining" (
    "id" TEXT NOT NULL,
    "guardaTrabalhada" "Position" NOT NULL,
    "passagemTrabalhada" TEXT NOT NULL,
    "funcionou" BOOLEAN NOT NULL,
    "nota" TEXT,
    "parceiroId" TEXT NOT NULL,
    "trainingSessionId" TEXT NOT NULL,

    CONSTRAINT "SpecificTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "faixa" "Belts" NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Drill" ADD CONSTRAINT "Drill_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SparringRound" ADD CONSTRAINT "SparringRound_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SparringRound" ADD CONSTRAINT "SparringRound_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificTraining" ADD CONSTRAINT "SpecificTraining_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificTraining" ADD CONSTRAINT "SpecificTraining_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
