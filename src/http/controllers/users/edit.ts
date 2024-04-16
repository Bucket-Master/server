import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma'
import { AppError } from '../../errors/AppError'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    name: z.string().min(3).optional(),
    companyName: z.string().min(3).optional(),
    phone: z.string().optional(),
  })

  const editParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = editParamsSchema.parse(request.params)
  const { name, companyName, phone } = editBodySchema.parse(request.body)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    AppError('User not found.', 404, reply)
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      companyName,
      phone,
    },
  })

  return reply.status(200).send()
}
