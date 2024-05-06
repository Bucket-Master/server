import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetTaskUseCase } from '@/use-cases/factories/make-get-task-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = editParamsSchema.parse(request.params)

  try {
    const getTaskUseCase = makeGetTaskUseCase()

    const { task } = await getTaskUseCase.execute({
      taskId,
    })

    return reply.status(200).send({
      task,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
