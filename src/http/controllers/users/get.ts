import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { AppError } from '../../errors/AppError'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = editParamsSchema.parse(request.params)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    AppError('User not found.', 404, reply)
  }

  return reply.status(200).send({
    user,
  })
}
