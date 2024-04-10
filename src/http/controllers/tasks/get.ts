import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { AppError } from '../../errors/AppError'

export async function get(request: FastifyRequest, reply: FastifyReply) {
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

  return reply.status(200).send({
    task,
  })
}
