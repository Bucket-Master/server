import { FastifyInstance } from 'fastify'
import { create } from './create'
import { edit } from './edit'
import { list } from './list'
import { get } from './get'
import { remove } from './remove'

export async function TaskRoutes(app: FastifyInstance) {
  app.post('/tasks', create)
  app.put('/tasks/:taskId', edit)

  app.get('/tasks/list/:userId', list)
  app.get('/tasks/:taskId', get)

  app.delete('/tasks/:taskId', remove)
}
