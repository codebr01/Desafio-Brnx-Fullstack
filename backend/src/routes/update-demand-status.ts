import { FastifyInstance } from "fastify";
import { PrismaClient, StatusDemanda } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const updateStatusSchema = z.object({
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]),
});

type UpdateStatusBody = z.infer<typeof updateStatusSchema>;

export async function updateDemandStatus(app: FastifyInstance) {
  app.patch("/demands/:id", async (request, reply) => {

    console.log('oi');
    
    const { id } = request.params as { id: string };
    let body: UpdateStatusBody;

    try {
      body = updateStatusSchema.parse(request.body);
    } catch (err) {
      return reply.status(400).send({ error: "Status inválido", details: err });
    }

    try {
      const demandaAtualizada = await prisma.demanda.update({
        where: { id: parseInt(id) },
        data: { status: body.status as StatusDemanda },
      });

      return reply.send(demandaAtualizada);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Erro ao atualizar demanda" });
    }
  });
}
