import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'

import { DeleteTaskUseCase } from '../delete-task-use-case'

export function makeDeleteTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new DeleteTaskUseCase(tasksRepository)

  return useCase
}
