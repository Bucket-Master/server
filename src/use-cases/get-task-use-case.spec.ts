import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetTaskUseCase } from './get-task-use-case'

let usersRepository: InMemoryUsersRepository
let tasksRepository: InMemoryTasksRepository
let sut: GetTaskUseCase

describe('Get User Use Case', async () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    tasksRepository = new InMemoryTasksRepository()
    sut = new GetTaskUseCase(tasksRepository)

    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'John Company',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
      role: 'USER',
    })

    await tasksRepository.create({
      id: 'task-01',
      buckets: 2,
      userId: 'user-01',
    })
  })

  it('should be able to get task', async () => {
    const { task } = await sut.execute({
      taskId: 'task-01',
    })

    expect(task).not.toEqual(null)
    expect(task.id).toEqual('task-01')
  })
})
