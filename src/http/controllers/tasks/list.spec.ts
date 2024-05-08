import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('List Tasks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[GET] /tasks/list', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        buckets: 2,
      })

    await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        buckets: 3,
      })

    const response = await request(app.server)
      .get('/tasks/list')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1 })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pagination.items).toHaveLength(2)
  })
})
