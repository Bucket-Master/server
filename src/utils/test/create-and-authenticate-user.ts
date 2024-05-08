import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin?: boolean,
) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
      companyName: 'Company test',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const authResponse = await request(app.server).post('/auth/login').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    user,
    token,
  }
}
