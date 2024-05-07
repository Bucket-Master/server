import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'

export async function get(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId',
    {
      schema: {
        summary: 'Get an user',
        tags: ['users'],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string(),
              companyName: z.string().nullable(),
              cnpj: z.string(),
              phone: z.string(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const editParamsSchema = z.object({
        userId: z.string().uuid(),
      })

      const { userId } = editParamsSchema.parse(request.params)

      try {
        const getUserUseCase = makeGetUserUseCase()

        const { user } = await getUserUseCase.execute({ userId })

        return reply.status(200).send({
          user,
        })
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        return reply.status(500).send()
      }
    },
  )
}
