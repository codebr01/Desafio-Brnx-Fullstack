import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function listDemands(app: FastifyInstance) {
  app.get("/demands", async (request, reply) => {
    try {
      const demandas = await prisma.demanda.findMany({
        include: {
          provedor: {
            select: {
              nomeFantasia: true,
            },
          },
        },
        orderBy: {
          dataCriacao: "desc",
        },
      });

      return reply.send(demandas);
    } catch (error) {
      console.error("Erro ao listar demandas:", error);
      return reply.status(500).send({ error: "Erro ao buscar demandas" });
    }
  });
}
