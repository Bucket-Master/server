import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { DeleteTaskUseCase } from './delete-task-use-case'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository
let sut: DeleteTaskUseCase

describe('Delete Task Use Case', async () => {
  beforeEach(async () => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()

    sut = new DeleteTaskUseCase(tasksRepository)

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
      status: 'CLOSED',
    })
  })

  it('should be able to delete task', async () => {
    await sut.execute({
      taskId: 'task-01',
    })

    const task = await tasksRepository.findById('task-01')

    expect(task).toBeNull()
  })

  it('should not be able to delete task with wrong id', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
