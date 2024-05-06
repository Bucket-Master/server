import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchTasksUseCase } from '@/use-cases/factories/make-fetch-tasks-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const listQuerySchema = z.object({
    page: z.string().nullable().default('1').transform(Number),
  })

  const { userId } = listParamsSchema.parse(request.params)
  const { page } = listQuerySchema.parse(request.query)

  const fetchTaskUseCase = makeFetchTasksUseCase()

  const { pagination } = await fetchTaskUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send({
    pagination,
  })
}
