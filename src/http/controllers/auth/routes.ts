import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'

export async function AuthenticateRoutes(app: FastifyInstance) {
  app.register(authenticate)
}
