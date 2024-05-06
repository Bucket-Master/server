import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreateTaskUseCase } from '../create-task-use-case'

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateTaskUseCase(tasksRepository, usersRepository)

  return useCase
}
