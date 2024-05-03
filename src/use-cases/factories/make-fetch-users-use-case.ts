import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { FetchUserUseCase } from '../fetch-users-use-case'

export function makeFetchUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new FetchUserUseCase(usersRepository)

  return useCase
}
