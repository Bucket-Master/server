import { randomUUID } from 'node:crypto'

import { Prisma, Task } from '@prisma/client'

import { Pagination } from '@/@types/pagination'

import { TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const task: Task = {
      id: data.id ?? randomUUID(),
      status: data.status ?? 'OPEN',
      buckets: data.buckets,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    }

    this.items.push(task)

    return task
  }

  async edit(
    taskId: string,
    data: Prisma.TaskUncheckedUpdateInput,
  ): Promise<Task | null> {
    const index = this.items.findIndex((item) => item.id === taskId)

    if (index <= -1) {
      return null
    }

    const task = <Task>{ ...this.items[index], ...data }

    return task
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === taskId)

    if (!task) {
      return null
    }

    return task
  }

  async fetch(userId: string, page: number): Promise<Pagination> {
    const tasksByUserId = this.items.filter((item) => item.userId === userId)

    const tasks = tasksByUserId.slice((page - 1) * 20, page * 20)
    const totalItems = tasks.length
    const totalPages = Math.ceil(totalItems / 20)
    const itemsPerPage = page === totalPages ? totalPages % 20 : 20

    return {
      currentPage: page,
      totalItems,
      totalPages,
      itemsPerPage,
      items: tasks,
    }
  }

  async delete(taskId: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === taskId)

    if (index > -1) {
      this.items.splice(index, 1)
    }
  }
}
