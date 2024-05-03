import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Remove Task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] /tasks', async () => {
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
        status: 'CLOSED',
        userId: user.id,
      },
    })

    const response = await request(app.server).delete(`/tasks/${task.id}`)

    expect(response.statusCode).toEqual(200)

    const taskOnDatabase = await prisma.task.findFirst({
      where: {
        id: task.id,
      },
    })

    expect(taskOnDatabase).toBeNull()
  })
})
