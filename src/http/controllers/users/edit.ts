import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeEditUserUseCase } from '@/use-cases/factories/make-edit-user-use-case'

export async function edit(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/users/:userId',
    {
      schema: {
        summary: 'Edit an user',
        tags: ['users'],
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(3).optional(),
          email: z.string().email().optional(),
          password: z.string().min(6).optional(),
          oldPassword: z.string().min(6).optional(),
          companyName: z.string().min(3).optional(),
          phone: z.string().optional(),
        }),
        response: {
          201: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
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

        return reply.status(500).send()
      }
    },
  )
}
