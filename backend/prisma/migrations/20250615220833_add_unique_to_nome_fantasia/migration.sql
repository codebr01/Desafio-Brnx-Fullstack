/*
  Warnings:

  - A unique constraint covering the columns `[nomeFantasia]` on the table `Provedor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Provedor_nomeFantasia_key" ON "Provedor"("nomeFantasia");
