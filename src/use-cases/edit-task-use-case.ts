import { Prisma, Task } from '@prisma/client'

import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditTaskUseCaseRequest {
  taskId: string
  data: Prisma.TaskUncheckedUpdateInput
}

interface EditTaskUseCaseResponse {
  task: Task
}

export class EditTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    data,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const updatedTask = await this.tasksRepository.edit(taskId, data)

    return {
      task: updatedTask,
    }
  }
}
