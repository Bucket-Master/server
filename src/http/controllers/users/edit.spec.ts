import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Edit a User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[PUT] /users', async () => {
    const user = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
    })

    const userId = user.body.user_id

    const response = await request(app.server).put(`/users/${userId}`).send({
      name: 'John Wick',
      companyName: 'John Company',
    })

    expect(response.statusCode).toEqual(200)

    const userEditedOnDatabase = await prisma.user.findFirst({
      where: {
        name: 'John Wick',
        companyName: 'John Company',
      },
    })

    expect(userEditedOnDatabase).toBeTruthy()
  })
})
