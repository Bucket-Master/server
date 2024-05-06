import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { FetchTaskUseCase } from './fetch-tasks-use-case'

let usersRepository: InMemoryUsersRepository
let tasksRepository: InMemoryTasksRepository
let sut: FetchTaskUseCase

describe('Fetch Tasks Use Case', () => {
  beforeEach(async () => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchTaskUseCase(tasksRepository)

    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
      cnpj: 'cnpj-example',
      role: 'USER',
      phone: 'phone-example',
    })
  })

  it('should be able fetch tasks', async () => {
    for (let i = 1; i <= 22; i++) {
      await tasksRepository.create({
        userId: 'user-01',
        buckets: 3,
      })
    }

    const { pagination } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(pagination.items).toHaveLength(2)
  })
})
