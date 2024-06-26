import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[POST] /tasks', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        buckets: 2,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      task: expect.objectContaining({
        buckets: 2,
        userId: user.id,
      }),
    })
  })
})
