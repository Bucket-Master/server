import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUsersUseCase } from '@/use-cases/factories/make-fetch-users-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    page: z.string().nullable().default('1').transform(Number),
  })

  const { page } = listQuerySchema.parse(request.params)

  try {
    const fetchUsersUseCase = makeFetchUsersUseCase()
    const { pagination } = await fetchUsersUseCase.execute({
      page,
    })

    return {
      pagination,
    }
  } catch (error) {
    return reply.status(500).send()
  }
}
