import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { AppError } from '@/http/errors/AppError'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().min(3),
    companyName: z.string().min(3).optional(),
    cnpj: z.string(),
    phone: z.string(),
    role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
  })

  const { name, companyName, cnpj, phone, role } = createBodySchema.parse(
    request.body,
  )

  const userWithSameCnpj = await prisma.user.findUnique({
    where: {
      cnpj,
    },
  })

  if (userWithSameCnpj) {
    AppError('Cnpj already exists.', 409, reply)
  }

  const user = await prisma.user.create({
    data: {
      name,
      companyName,
      cnpj,
      phone,
      role,
    },
  })

  return reply.status(201).send({
    user_id: user.id,
  })
}
