import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'

describe('Create Task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[POST] /tasks', async () => {
    const user = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
    })

    const userId = user.body.user_id

    const response = await request(app.server).post('/tasks').send({
      buckets: 2,
      userId,
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      task: expect.objectContaining({
        buckets: 2,
        userId,
      }),
    })
  })
})
