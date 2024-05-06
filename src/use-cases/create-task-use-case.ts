import { Task } from '@prisma/client'

import { TasksRepository } from '@/repositories/tasks-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface CreateTaskUseCaseRequest {
  userId: string
  buckets: number
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    buckets,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error()
    }

    const task = await this.tasksRepository.create({
      buckets,
      userId: user.id,
    })

    return {
      task,
    }
  }
}
