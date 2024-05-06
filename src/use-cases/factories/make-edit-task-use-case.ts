import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks-repository'

import { EditTaskUseCase } from '../edit-task-use-case'

export function makeEditTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new EditTaskUseCase(tasksRepository)

  return useCase
}
