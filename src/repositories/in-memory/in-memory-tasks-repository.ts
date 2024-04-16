import { randomUUID } from 'node:crypto'

import { Prisma, Task } from '@prisma/client'

import { TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task: Task = {
      id: data.id ?? randomUUID(),
      status: data.status ?? 'OPEN',
      buckets: data.buckets,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.user?.connect?.id ?? null,
    }

    this.items.push(task)

    return task
  }
}
