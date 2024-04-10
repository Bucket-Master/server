import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    page: z.string().nullable().default('1').transform(Number),
  })

  const { page } = listQuerySchema.parse(request.params)

  const user = await prisma.user.findMany({
    orderBy: {
      name: 'asc',
    },
    take: 20,
    skip: (page - 1) * 20,
  })

  return reply.status(200).send({
    user,
  })
}
