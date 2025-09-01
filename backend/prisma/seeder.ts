import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

faker.locale = 'pt_BR'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 3; i++) {
    const provedor = await prisma.provedor.create({
      data: {
        nomeFantasia: faker.company.name(),
        responsavel: faker.person.fullName(),
        telefone: faker.phone.number('(##) #####-####'),
        email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName() }).toLowerCase(),
      },
    })

    for (let j = 0; j < 2; j++) {
      const demanda = await prisma.demanda.create({
        data: {
          titulo: `Solicitação de ${faker.hacker.noun()}`,
          descricao: faker.lorem.paragraph(),
          tipo: 'CONFIGURACAO',
          status: 'PENDENTE',
          provedorId: provedor.id,
        },
      })

      await prisma.acaoTecnica.create({
        data: {
          descricao: `Realizada ação: ${faker.hacker.verb()} ${faker.hacker.noun()}`,
          tecnico: faker.person.fullName(),
          demandaId: demanda.id,
        },
      })
    }
  }
}

main()
  .then(() => {
    console.log('Seeder rodado com sucesso!')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    return prisma.$disconnect().then(() => process.exit(1))
  })
