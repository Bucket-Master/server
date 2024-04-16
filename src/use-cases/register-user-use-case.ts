import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  cnpj: string
  companyName?: string
  role?: 'USER' | 'ADMIN'
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    cnpj,
    phone,
    companyName,
    role = 'USER',
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 8)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      companyName,
      cnpj,
      phone,
      role,
    })

    return {
      user,
    }
  }
}
