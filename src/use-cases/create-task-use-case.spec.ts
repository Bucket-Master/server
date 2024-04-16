import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { TasksRepository } from '@/repositories/tasks-repository'

import { CreateTaskUseCase } from './create-task-use-case'

let taksRepository: TasksRepository
let sut: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    taksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(taksRepository)
  })

  it('should be able create a task', async () => {
    const { task } = await sut.execute({
      buckets: 2,
    })

    expect(task.buckets).toEqual(2)
    expect(task.id).toEqual(expect.any(String))
  })
})
