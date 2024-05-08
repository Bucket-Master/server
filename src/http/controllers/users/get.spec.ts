import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get a User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[GET] /users', async () => {
    const { user, token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      user: expect.objectContaining({ name: 'John Doe' }),
    })
  })
})
