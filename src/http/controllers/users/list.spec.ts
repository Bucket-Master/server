import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'

describe('List Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[GET] /users', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
    })

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
      companyName: 'Company test',
      cnpj: 'cnpj-test-2',
      phone: 'phone-test',
    })

    const response = await request(app.server).get(`/users`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pagination.items).toHaveLength(2)
  })
})
