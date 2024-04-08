import fastify from 'fastify'
import { BucketRoutes } from './http/bucket/routes'

export const app = fastify()

app.register(BucketRoutes)
