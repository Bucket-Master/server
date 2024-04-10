import { FastifyReply } from 'fastify'

export async function AppError(
  message: string,
  statusCode: number,
  reply: FastifyReply,
) {
  reply.status(statusCode).send({ statusCode, message })
}
