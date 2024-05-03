import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'

describe('Get a User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[GET] /users', async () => {
    const user = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
    })

    const userId = user.body.user_id

    const response = await request(app.server).get(`/users/${userId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      user: expect.objectContaining({ name: 'John Doe' }),
    })
  })
})
