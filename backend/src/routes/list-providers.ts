import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function listProviders(app: FastifyInstance) {
  app.get("/providers", async (request, reply) => {
    try {
      const provedores = await prisma.provedor.findMany({
        orderBy: {
          nomeFantasia: "asc",
        },
      });

      return reply.send(provedores);
    } catch (error) {
      console.error("Erro ao listar provedores:", error);
      return reply.status(500).send({ error: "Erro ao buscar provedores" });
    }
  });
}