import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'

describe('List Tasks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[GET] /tasks', async () => {
    const user = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
    })

    const userId = user.body.user_id

    await request(app.server).post('/tasks').send({
      userId,
      buckets: 3,
    })

    await request(app.server).post('/tasks').send({
      userId,
      buckets: 2,
    })

    const response = await request(app.server).get(`/tasks/list/${userId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pagination.items).toHaveLength(2)
  })
})
