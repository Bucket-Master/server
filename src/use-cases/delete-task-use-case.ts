import { TasksRepository } from '@/repositories/tasks-repository'

interface DeleteTaskUseCaseRequest {
  taskId: string
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId }: DeleteTaskUseCaseRequest): Promise<void> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new Error()
    }

    if (task.status !== 'CLOSED') {
      throw new Error()
    }

    await this.tasksRepository.delete(taskId)
  }
}
