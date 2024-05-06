import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateTaskUseCase } from '@/use-cases/factories/make-create-task-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    buckets: z.number(),
    userId: z.string().uuid(),
  })

  const { buckets, userId } = createBodySchema.parse(request.body)

  try {
    const createTaskUseCase = makeCreateTaskUseCase()

    const { task } = await createTaskUseCase.execute({
      buckets,
      userId,
    })

    return reply.status(201).send({
      task,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: 'Bad request.',
      })
    }

    reply.status(500).send()
  }
}
