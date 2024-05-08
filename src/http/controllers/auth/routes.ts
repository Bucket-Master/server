import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'

export async function AuthenticateRoutes(app: FastifyInstance) {
  app.register(authenticate)
  app.register(refresh)
  app.register(profile)
}
