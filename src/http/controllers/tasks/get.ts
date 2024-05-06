import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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
    if (error instanceof Error) {
      return reply.status(400).send({
        message: 'Bad Request.',
      })
    }
  }
}
