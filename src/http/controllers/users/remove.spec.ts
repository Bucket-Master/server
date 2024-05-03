import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Remove User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] /users', async () => {
    const user = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
    })

    const userId = user.body.user_id

    const response = await request(app.server).delete(`/users/${userId}`)

    expect(response.statusCode).toEqual(200)

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    expect(userOnDatabase).toBeNull()
  })
})
