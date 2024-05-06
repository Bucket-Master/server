import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeDeleteTaskUseCase } from '@/use-cases/factories/make-delete-task-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = editParamsSchema.parse(request.params)

  try {
    const deleteTaskUseCase = makeDeleteTaskUseCase()

    deleteTaskUseCase.execute({
      taskId,
    })

    reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send()
    }

    return reply.status(500).send()
  }
}
