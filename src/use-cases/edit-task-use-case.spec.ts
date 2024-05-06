import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { EditTaskUseCase } from './edit-task-use-case'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository
let sut: EditTaskUseCase

describe('Edit Task Use Case', async () => {
  beforeEach(async () => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()

    sut = new EditTaskUseCase(tasksRepository)

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

  it('should be able to edit task', async () => {
    const { task } = await sut.execute({
      taskId: 'task-01',
      data: {
        status: 'CURRENT',
        buckets: 1,
      },
    })

    expect(task.status).toEqual('CURRENT')
  })

  it('should not be able to edit task with wrong id', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'wrong-id',
        data: {
          status: 'CURRENT',
          buckets: 1,
        },
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
