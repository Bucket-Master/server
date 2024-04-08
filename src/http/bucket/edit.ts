import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

const statusEnum = ['FREE', 'USED', 'FULL'] as const

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    status: z.enum(statusEnum).optional(),
    number: z.number().min(1).positive().optional(),
  })

  const editParamsSchema = z.object({
    bucketId: z.coerce.number(),
  })

  const { bucketId } = editParamsSchema.parse(request.params)
  const { status, number } = editBodySchema.parse(request.body)

  const bucket = await prisma.bucekt.findUnique({
    where: {
      id: bucketId,
    },
  })

  if (!bucket) {
    throw new Error('Bucket not found.')
  }

  await prisma.bucekt.update({
    where: {
      id: bucketId,
    },
    data: {
      status,
      number,
    },
  })

  return reply.status(200).send()
}
