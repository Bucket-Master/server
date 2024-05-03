import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AppError } from '@/http/errors/AppError'
import { prisma } from '@/lib/prisma'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    status: z
      .enum(['OPEN', 'CURRENT', 'REPLACE', 'CLOSED'])
      .optional()
      .default('OPEN'),
    buckets: z.number(),
    userId: z.string().uuid(),
  })

  const { status, buckets, userId } = createBodySchema.parse(request.body)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    AppError('User not found.', 404, reply)
  }

  const task = await prisma.task.create({
    data: {
      status,
      buckets,
      userId,
    },
  })

  return reply.status(201).send({
    task,
  })
}
