import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { TasksRepository } from '@/repositories/tasks-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { CreateTaskUseCase } from './create-task-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found'

let taksRepository: TasksRepository
let usersRepository: UsersRepository
let sut: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(async () => {
    taksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateTaskUseCase(taksRepository, usersRepository)

    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cnpj: 'cnpj-example',
      phone: 'phone-example',
      role: 'USER',
    })
  })

  it('should be able create a task', async () => {
    const { task } = await sut.execute({
      userId: 'user-01',
      buckets: 2,
    })

    expect(task.buckets).toEqual(2)
    expect(task.id).toEqual(expect.any(String))
  })

  it('should not be able create a task if user not exists', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'user-not-exists',
          buckets: 1,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
