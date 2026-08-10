-- DropForeignKey
ALTER TABLE "SparringRound" DROP CONSTRAINT "SparringRound_parceiroId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificTraining" DROP CONSTRAINT "SpecificTraining_parceiroId_fkey";

-- AddForeignKey
ALTER TABLE "SparringRound" ADD CONSTRAINT "SparringRound_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificTraining" ADD CONSTRAINT "SpecificTraining_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
