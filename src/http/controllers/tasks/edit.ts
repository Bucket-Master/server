import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeEditTaskUseCase } from '@/use-cases/factories/make-edit-task-use-case'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    data: z.object({
      status: z.enum(['CURRENT', 'REPLACE', 'CLOSED']).optional(),
      buckets: z.number().optional(),
    }),
  })

  const editParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = editParamsSchema.parse(request.params)
  const { data } = editBodySchema.parse(request.body)

  try {
    const editTaskUseCase = makeEditTaskUseCase()

    await editTaskUseCase.execute({
      taskId,
      data,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send()
    }

    return reply.status(500).send()
  }
}
