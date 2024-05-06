import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'

import { GetTaskUseCase } from '../get-task-use-case'

export function makeGetTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new GetTaskUseCase(tasksRepository)

  return useCase
}
