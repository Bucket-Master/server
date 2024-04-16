import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const listQuerySchema = z.object({
    query: z.string().nullish(),
    page: z.string().nullable().default('1').transform(Number),
  })

  const { userId } = listParamsSchema.parse(request.params)
  const { page, query } = listQuerySchema.parse(request.query)

  const task = await prisma.task.findMany({
    where: query
      ? {
          userId,
          status: {
            contains: query,
          },
        }
      : { userId },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
    skip: (page - 1) * 20,
  })

  return reply.status(200).send({
    task,
  })
}
