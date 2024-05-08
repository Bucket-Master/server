import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Remove Task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] /tasks', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const task = await prisma.task.create({
      data: {
        buckets: 2,
        status: 'CLOSED',
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })
})
