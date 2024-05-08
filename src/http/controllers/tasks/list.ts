import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchTasksUseCase } from '@/use-cases/factories/make-fetch-tasks-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    page: z.string().nullable().default('1').transform(Number),
  })

  const { sub } = request.user
  const { page } = listQuerySchema.parse(request.query)

  const fetchTaskUseCase = makeFetchTasksUseCase()

  const { pagination } = await fetchTaskUseCase.execute({
    userId: sub,
    page,
  })

  return reply.status(200).send({
    pagination,
  })
}
