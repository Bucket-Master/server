import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'

export async function profile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      schema: {
        summary: 'User profile',
        tags: ['auth'],
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
      onRequest: [verifyJwt],
    },
    async (request, reply) => {
      const { sub } = request.user

      try {
        const getUserUseCase = makeGetUserUseCase()

        const { user } = await getUserUseCase.execute({ userId: sub })

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
