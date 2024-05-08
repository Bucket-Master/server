import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Edit Task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[PUT] /tasks', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const task = await prisma.task.create({
      data: {
        buckets: 2,
        status: 'OPEN',
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        data: {
          status: 'REPLACE',
          buckets: 1,
        },
      })

    expect(response.statusCode).toEqual(200)

    const taskEditedOnDatabase = await prisma.task.findFirst({
      where: {
        buckets: 1,
        status: 'REPLACE',
      },
    })

    expect(taskEditedOnDatabase).toBeTruthy()
  })
})
