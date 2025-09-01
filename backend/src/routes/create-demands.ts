import { FastifyInstance } from "fastify";
import { PrismaClient, TipoDemanda } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const createDemandaSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  tipo: z.enum(["DIAGNOSTICO", "MANUTENCAO", "CONFIGURACAO", "INSTALACAO", "OUTRO"]),
  provedorId: z.number(),
});


type CreateDemandaBody = z.infer<typeof createDemandaSchema>;

export function createDemands(app: FastifyInstance) {
  app.post("/demands/create", async (request, reply) => {
    let data: CreateDemandaBody;

    try {
      data = createDemandaSchema.parse(request.body);
    } catch (err) {
      return reply.status(400).send({ error: "Dados inválidos", details: err });
    }

    const { titulo, descricao, tipo, provedorId } = data;

    try {

      const provedorEncontrado = await prisma.provedor.findUnique({
        where: { id: provedorId },
      });

      if (!provedorEncontrado) {
        return reply.status(404).send({ error: "Provedor não encontrado" });
      }

      const novaDemanda = await prisma.demanda.create({
        data: {
          titulo,
          descricao,
          tipo: tipo as TipoDemanda,
          status: "PENDENTE",
          provedorId: provedorEncontrado.id,
        },
      });

      return reply.status(201).send(novaDemanda);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Erro ao criar demanda" });
    }
  });
}
