import { Task } from '@prisma/client'

import { TasksRepository } from '@/repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  buckets: number
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    buckets,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = await this.tasksRepository.create({
      buckets,
    })

    return {
      task,
    }
  }
}
