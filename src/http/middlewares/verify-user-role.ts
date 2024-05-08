import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(allowedRoles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
