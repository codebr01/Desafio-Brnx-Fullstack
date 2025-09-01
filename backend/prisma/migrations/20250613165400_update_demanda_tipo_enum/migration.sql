-- 1. Crie o novo enum
CREATE TYPE "TipoDemanda" AS ENUM ('DIAGNOSTICO', 'MANUTENCAO', 'CONFIGURACAO', 'INSTALACAO', 'OUTRO');

-- 2. Crie nova coluna temporária
ALTER TABLE "Demanda" ADD COLUMN "tipo_tmp" "TipoDemanda";

-- 3. Copie os valores antigos convertendo (ATENÇÃO: adapte conforme seus dados)
UPDATE "Demanda" SET "tipo_tmp" =
  CASE
    WHEN LOWER(tipo) = 'diagnóstico' THEN 'DIAGNOSTICO'::"TipoDemanda"
    WHEN LOWER(tipo) = 'manutenção' THEN 'MANUTENCAO'::"TipoDemanda"
    WHEN LOWER(tipo) = 'configuração' THEN 'CONFIGURACAO'::"TipoDemanda"
    WHEN LOWER(tipo) = 'instalação' THEN 'INSTALACAO'::"TipoDemanda"
    ELSE 'OUTRO'::"TipoDemanda"
  END;

-- 4. Remova a antiga e renomeie a nova
ALTER TABLE "Demanda" DROP COLUMN "tipo";
ALTER TABLE "Demanda" RENAME COLUMN "tipo_tmp" TO "tipo";
