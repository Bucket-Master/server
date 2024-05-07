import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        summary: 'Post a sessions user',
        tags: ['auth'],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = authenticateBodySchema.parse(request.body)

      try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
          email,
          password,
        })

        const token = await reply.jwtSign({
          sign: { sub: user.id, role: user.role },
        })

        const refreshToken = await reply.jwtSign({
          sign: { sub: user.id, role: user.role, expireIn: '3d' },
        })

        return reply
          .setCookie('refreshToken', refreshToken, {
            secure: true,
            httpOnly: true,
          })
          .status(200)
          .send({ token })
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return reply.status(400).send({
            message: error.message,
          })
        }

        return reply.status(500).send()
      }
    },
  )
}
