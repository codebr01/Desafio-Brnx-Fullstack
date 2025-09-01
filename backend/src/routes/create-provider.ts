import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const createProviderSchema = z.object({
  nomeFantasia: z.string().min(1, "Nome Fantasia é obrigatório"),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
});

type CreateProviderBody = z.infer<typeof createProviderSchema>;

export function createProvider(app: FastifyInstance) {
  app.post("/providers/create", async (request, reply) => {
    let data: CreateProviderBody;

    try {
      data = createProviderSchema.parse(request.body);
    } catch (err) {
      return reply.status(400).send({
        error: "Dados inválidos",
        details: err,
      });
    }

    const { nomeFantasia, responsavel, telefone, email } = data;

    try {
      
      const nomeDuplicado = await prisma.provedor.findUnique({
        where: { nomeFantasia },
      });

      if (nomeDuplicado) {
        return reply.status(409).send({
          error: "Já existe um provedor com esse nome fantasia",
        });
      }

      // Verifica e-mail duplicado
      const emailDuplicado = await prisma.provedor.findUnique({
        where: { email },
      });

      if (emailDuplicado) {
        return reply.status(409).send({
          error: "Já existe um provedor com esse e-mail",
        });
      }

      const novoProvedor = await prisma.provedor.create({
        data: {
          nomeFantasia,
          responsavel,
          telefone,
          email,
        },
      });

      return reply.status(201).send(novoProvedor);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Erro ao criar provedor" });
    }
  });
}