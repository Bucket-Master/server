import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function refresh(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/auth/refresh',
    {
      schema: {
        summary: 'Refresh token an user',
        tags: ['auth'],
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      await request.jwtVerify({ onlyCookie: true })

      const { role } = request.user

      const token = await reply.jwtSign(
        { role },
        {
          sign: {
            sub: request.user.sub,
          },
        },
      )

      const refreshToken = await reply.jwtSign(
        { role },
        {
          sign: {
            sub: request.user.sub,
            expiresIn: '3d',
          },
        },
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({
          token,
        })
    },
  )
}
