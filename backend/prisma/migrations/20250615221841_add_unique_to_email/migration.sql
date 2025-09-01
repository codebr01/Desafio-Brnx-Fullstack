/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Provedor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Provedor_email_key" ON "Provedor"("email");
