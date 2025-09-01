/*
  Warnings:

  - Made the column `tipo` on table `Demanda` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Demanda" ALTER COLUMN "tipo" SET NOT NULL;
