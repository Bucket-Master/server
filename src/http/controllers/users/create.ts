import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    companyName: z.string().min(3).optional(),
    cnpj: z.string(),
    phone: z.string(),
    role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
  })

  const { name, email, password, companyName, cnpj, phone, role } =
    createBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    const { user } = await registerUserUseCase.execute({
      name,
      email,
      password,
      companyName,
      cnpj,
      phone,
      role,
    })

    return reply.status(201).send({
      user_id: user.id,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
