import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { RegisterUserUseCase } from '../register-user-use-case'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(usersRepository)

  return useCase
}
