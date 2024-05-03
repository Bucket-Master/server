import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { EditUserUseCase } from '../edit-user-use-case'

export function makeEditUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new EditUserUseCase(usersRepository)

  return useCase
}
