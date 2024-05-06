import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Edit Task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[PUT] /tasks', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        companyName: 'Company test',
        cnpj: 'cnpj-test',
        phone: 'phone-test',
        role: 'USER',
      },
    })

    const task = await prisma.task.create({
      data: {
        buckets: 2,
        status: 'OPEN',
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .put(`/tasks/${task.id}`)
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
