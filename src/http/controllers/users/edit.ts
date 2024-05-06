import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeEditUserUseCase } from '@/use-cases/factories/make-edit-user-use-case'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    data: z.object({
      name: z.string().min(3).optional(),
      companyName: z.string().min(3).optional(),
      phone: z.string().optional(),
    }),
  })

  const editParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = editParamsSchema.parse(request.params)
  const { data } = editBodySchema.parse(request.body)

  try {
    const editUserUseCase = makeEditUserUseCase()

    await editUserUseCase.execute({
      userId,
      data,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(400).send({
      message: error,
    })
  }
}
