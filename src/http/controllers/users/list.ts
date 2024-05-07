import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeFetchUsersUseCase } from '@/use-cases/factories/make-fetch-users-use-case'

export async function list(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      schema: {
        summary: 'List users',
        tags: ['users'],
        querystring: z.object({
          // query: z.string().optional(),
          page: z.string().nullable().default('1').transform(Number),
        }),
        response: {
          200: z.object({
            pagination: z.object({
              currentPage: z.number().int(),
              totalItems: z.number().int(),
              totalPages: z.number().int(),
              itemsPerPage: z.number().int(),
              items: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string().email(),
                  companyName: z.string().nullable(),
                  createdAt: z.date(),
                  role: z.enum(['ADMIN', 'USER']),
                }),
              ),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const listQuerySchema = z.object({
        page: z.string().nullable().default('1').transform(Number),
      })

      const { page } = listQuerySchema.parse(request.params)

      try {
        const fetchUsersUseCase = makeFetchUsersUseCase()
        const { pagination } = await fetchUsersUseCase.execute({
          page,
        })

        return reply.status(200).send({
          pagination,
        })
      } catch (error) {
        return reply.status(500).send()
      }
    },
  )
}
