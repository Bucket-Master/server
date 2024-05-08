import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { edit } from './edit'
import { get } from './get'
import { list } from './list'
import { remove } from './remove'

export async function TaskRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/tasks',
    {
      schema: {
        summary: 'Create a task',
        tags: ['tasks'],
        body: z.object({
          buckets: z.number().int().positive(),
        }),
        response: {
          201: z.object({
            task: z.object({
              id: z.string().uuid(),
              status: z.enum(['OPEN', 'CURRENT', 'REPLACE', 'CLOSED']),
              buckets: z.number().int().positive(),
              userId: z.string().uuid(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    create,
  )

  app.put(
    '/tasks/:taskId',
    {
      schema: {
        summary: 'Edit a task',
        tags: ['tasks'],
        params: z.object({
          taskId: z.coerce.string(),
        }),
        body: z.object({
          data: z.object({
            buckets: z.number().int().positive().optional(),
            status: z.enum(['CURRENT', 'REPLACE', 'CLOSED']).optional(),
          }),
        }),
        response: {
          200: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    edit,
  )

  app.get(
    '/tasks/list',
    {
      schema: {
        summary: 'List a tasks',
        tags: ['tasks'],
        querystring: z.object({
          page: z.coerce.string(),
        }),
        response: {
          200: z.object({
            pagination: z.object({
              currentPage: z.number(),
              totalItems: z.number(),
              totalPages: z.number(),
              itemsPerPage: z.number(),
              items: z.array(
                z.object({
                  id: z.string().uuid(),
                  status: z.enum(['OPEN', 'CURRENT', 'REPLACE', 'CLOSED']),
                  buckets: z.number().int().positive(),
                  createdAt: z.date(),
                }),
              ),
            }),
          }),
        },
      },
    },
    list,
  )

  app.get(
    '/tasks/:taskId',
    {
      schema: {
        summary: 'Get a tasks',
        tags: ['tasks'],
        params: z.object({
          taskId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            task: z.object({
              id: z.string().uuid(),
              status: z.enum(['OPEN', 'CURRENT', 'REPLACE', 'CLOSED']),
              buckets: z.number().int().positive(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    get,
  )

  app.delete(
    '/tasks/:taskId',
    {
      schema: {
        summary: 'Delete a tasks',
        tags: ['tasks'],
        params: z.object({
          taskId: z.string().uuid(),
        }),
        response: {
          200: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    remove,
  )
}
