import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAction(app: FastifyInstance) {
  app.post("/actions/create", async (request, reply) => {
    const schema = z.object({
      descricao: z.string(),
      tecnico: z.string(),
      demandaId: z.number(),
    });

    const parsed = schema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({ error: "Dados inválidos", details: parsed.error.format() });
    }

    const { descricao, tecnico, demandaId } = parsed.data;

    try {
      const demanda = await prisma.demanda.findUnique({
        where: { id: demandaId }
      });

      if (!demanda) {
        return reply.status(404).send({ error: "Demanda não encontrada" });
      }

      const novaAcao = await prisma.acaoTecnica.create({
        data: {
          descricao,
          tecnico,
          demandaId
        }
      });

      return reply.status(201).send(novaAcao);
    } catch (error) {
      console.error("Erro ao criar ação técnica:", error);
      return reply.status(500).send({ error: "Erro interno ao criar ação" });
    }
  });
}
