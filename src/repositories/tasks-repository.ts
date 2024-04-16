import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
}
