import { FastifyReply, FastifyRequest } from 'fastify'
import { undefined, z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = editParamsSchema.parse(request.params)

  try {
    const getUserUseCase = makeGetUserUseCase()

    const { user } = await getUserUseCase.execute({ userId })

    return reply.status(200).send({
      user: {
        ...user,
        password: undefined,
      },
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
