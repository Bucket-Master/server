import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'

import { FetchTaskUseCase } from '../fetch-tasks-use-case'

export function makeFetchTasksUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new FetchTaskUseCase(tasksRepository)

  return useCase
}
