import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
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
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
