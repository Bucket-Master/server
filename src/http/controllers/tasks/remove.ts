import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { AppError } from '../../errors/AppError'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    taskId: z.string().cuid(),
  })

  const { taskId } = editParamsSchema.parse(request.params)

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  })

  if (!task) {
    AppError('Task not found.', 404, reply)
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  })

  return reply.status(200).send()
}
