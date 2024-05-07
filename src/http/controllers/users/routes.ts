import { FastifyInstance } from 'fastify'

import { create } from './create'
import { edit } from './edit'
import { get } from './get'
import { list } from './list'
import { remove } from './remove'

export async function UserRoutes(app: FastifyInstance) {
  app.register(create)
  app.register(edit)
  app.register(get)
  app.register(list)
  app.register(remove)
}
