import { Prisma, Task } from '@prisma/client'

import { Pagination } from '@/@types/pagination'
import { prisma } from '@/lib/prisma'

import { TasksRepository } from '../tasks-repository'

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    })

    return task
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    return task
  }

  async fetch(userId: string, page: number): Promise<Pagination> {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        status: true,
        buckets: true,
        createdAt: true,
      },
      where: {
        userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const totalItems = await prisma.task.count({
      where: {
        userId,
      },
    })

    const totalPages = Math.ceil(totalItems / 20)

    const itemsPerPage = page === totalPages ? totalItems % 20 : 20

    return {
      currentPage: page,
      totalItems,
      totalPages,
      itemsPerPage,
      items: tasks,
    }
  }

  async edit(
    taskId: string,
    data: Prisma.TaskUncheckedUpdateInput,
  ): Promise<Task | null> {
    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    })

    return task
  }

  async delete(taskId: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    })
  }
}
