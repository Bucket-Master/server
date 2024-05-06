import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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
    if (error instanceof Error) {
      return reply.status(400).send()
    }

    return reply.status(500).send()
  }
}
