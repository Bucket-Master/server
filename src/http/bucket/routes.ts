import { FastifyInstance } from 'fastify'
import { create } from './create'
import { edit } from './edit'
import { get } from './get'
import { list } from './list'
import { remove } from './remove'

export async function BucketRoutes(app: FastifyInstance) {
  app.post('/buckets', create)

  app.put('/buckets/:bucketId', edit)

  app.get('/buckets', list)
  app.get('/buckets/:bucketId', get)

  app.delete('/buckets/:bucketId', remove)
}
