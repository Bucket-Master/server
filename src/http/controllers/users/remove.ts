import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { AppError } from '../../errors/AppError'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
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

  await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  return reply.status(200).send()
}
