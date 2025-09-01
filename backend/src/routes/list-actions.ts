import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function listActions(app: FastifyInstance) {
  app.get("/actions/history", async (request, reply) => {
    try {
      const acoes = await prisma.acaoTecnica.findMany({
        include: {
          demanda: {
            select: {
              titulo: true,
              tipo: true,
              status: true,
              provedor: {
                select: { nomeFantasia: true }
              }
            }
          }
        },
        orderBy: {
          dataExecucao: "desc"
        }
      });

      console.log(acoes);

      return reply.send(acoes);
    } catch (error) {
      console.error("Erro ao listar ações:", error);
      return reply.status(500).send({ error: "Erro ao buscar ações" });
    }
  });
}
