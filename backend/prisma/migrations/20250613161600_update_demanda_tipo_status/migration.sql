/*
  Warnings:

  - Changed the type of `tipo` on the `Demanda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "StatusDemanda" ADD VALUE 'CANCELADA';

-- AlterTable
ALTER TABLE "Demanda" DROP COLUMN "tipo",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TipoDemanda";
