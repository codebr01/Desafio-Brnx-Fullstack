-- CreateEnum
CREATE TYPE "TipoDemanda" AS ENUM ('DIAGNOSTICO', 'MANUTENCAO', 'CONFIGURACAO', 'INSTALACAO', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusDemanda" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA');

-- CreateTable
CREATE TABLE "Provedor" (
    "id" SERIAL NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Provedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demanda" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "TipoDemanda" NOT NULL,
    "status" "StatusDemanda" NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provedorId" INTEGER NOT NULL,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcaoTecnica" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "tecnico" TEXT NOT NULL,
    "dataExecucao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "demandaId" INTEGER NOT NULL,

    CONSTRAINT "AcaoTecnica_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_provedorId_fkey" FOREIGN KEY ("provedorId") REFERENCES "Provedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcaoTecnica" ADD CONSTRAINT "AcaoTecnica_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
