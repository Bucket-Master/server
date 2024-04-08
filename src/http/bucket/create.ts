import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

const statusEnum = ['FREE', 'USED', 'FULL'] as const

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    status: z.enum(statusEnum),
    number: z.number().min(1).positive(),
  })

  const { status, number } = createBodySchema.parse(request.body)

  const bucket = await prisma.bucekt.create({
    data: {
      status,
      number,
    },
  })

  return reply.status(201).send({
    bucketId: bucket.id,
  })
}
