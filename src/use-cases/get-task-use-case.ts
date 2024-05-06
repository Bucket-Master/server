import { Task } from '@prisma/client'

import { TasksRepository } from '@/repositories/tasks-repository'

interface GetTaskUseCaseRequest {
  taskId: string
}

interface GetTaskUseCaseResponse {
  task: Task
}

export class GetTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new Error()
    }

    return {
      task,
    }
  }
}
