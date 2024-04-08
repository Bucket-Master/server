import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function get(request: FastifyRequest, reply: FastifyReply) {
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

  return reply.status(200).send({
    bucket,
  })
}
