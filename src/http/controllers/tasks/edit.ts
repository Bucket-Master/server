import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma'
import { AppError } from '../../errors/AppError'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    status: z.enum(['CURRENT', 'REPLACE', 'CLOSED']).optional(),
    buckets: z.number().optional(),
  })

  const editParamsSchema = z.object({
    taskId: z.string().cuid(),
  })

  const { taskId } = editParamsSchema.parse(request.params)
  const { status, buckets } = editBodySchema.parse(request.body)

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  })

  if (!task) {
    AppError('Task not found.', 404, reply)
  }

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
      buckets,
    },
  })

  return reply.status(200).send()
}
