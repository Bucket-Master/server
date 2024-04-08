import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    bucketId: z.coerce.number(),
  })

  const { bucketId } = editParamsSchema.parse(request.params)

  const bucket = await prisma.bucekt.findUnique({
    where: {
      id: bucketId,
    },
  })

  if (!bucket) {
    throw new Error('Bucket not found.')
  }

  await prisma.bucekt.delete({
    where: {
      id: bucketId,
    },
  })

  return reply.status(200).send()
}
