import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

export async function create(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Register an user',
        tags: ['users', 'auth'],
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
          companyName: z.string().min(3).optional(),
          cnpj: z.string(),
          phone: z.string(),
        }),
        response: {
          201: z.object({
            user_id: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const createBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        companyName: z.string().min(3).optional(),
        cnpj: z.string(),
        phone: z.string(),
        role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
      })

      const { name, email, password, companyName, cnpj, phone, role } =
        createBodySchema.parse(request.body)

      try {
        const registerUserUseCase = makeRegisterUserUseCase()

        const { user } = await registerUserUseCase.execute({
          name,
          email,
          password,
          companyName,
          cnpj,
          phone,
          role,
        })

        return reply.status(201).send({
          user_id: user.id,
        })
      } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
          return reply.status(409).send({
            message: error.message,
          })
        }

        return reply.status(500).send()
      }
    },
  )
}
