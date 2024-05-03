import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = editParamsSchema.parse(request.params)

  try {
    const deleteUserUseCase = makeDeleteUserUseCase()

    deleteUserUseCase.execute({
      userId,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({
        message: 'Bad Request.',
      })
    }

    return reply.status(500).send()
  }
}
