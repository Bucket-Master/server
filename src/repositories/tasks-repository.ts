import { Prisma, Task } from '@prisma/client'

import { Pagination } from '@/@types/pagination'

export interface TasksRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>
  edit(taskId: string, data: Prisma.TaskUncheckedUpdateInput): Promise<Task>
  findById(taskId: string): Promise<Task | null>
  fetch(userId: string, page: number): Promise<Pagination>
  delete(taskId: string): Promise<void>
}
