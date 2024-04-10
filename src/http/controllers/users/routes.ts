import { FastifyInstance } from 'fastify'
import { create } from './create'
import { edit } from './edit'
import { get } from './get'
import { list } from './list'
import { remove } from './remove'

export async function UserRoutes(app: FastifyInstance) {
  app.post('/users', create)

  app.put('/users/:userId', edit)

  app.get('/users', list)
  app.get('/users/:userId', get)

  app.delete('/users/:userId', remove)
}
