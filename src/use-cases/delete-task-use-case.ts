import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found'
import { TaskIsNotClosedError } from './errors/task-is-not-closed'

interface DeleteTaskUseCaseRequest {
  taskId: string
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId }: DeleteTaskUseCaseRequest): Promise<void> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (task.status !== 'CLOSED') {
      throw new TaskIsNotClosedError()
    }

    await this.tasksRepository.delete(taskId)
  }
}
