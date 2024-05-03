import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { FetchUserUseCase } from './fetch-users-use-case'

let usersRepository: InMemoryUsersRepository
let sut: FetchUserUseCase

describe('Fetch Users Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUserUseCase(usersRepository)
  })

  it('should be able fetch users', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        name: `User ${i}`,
        email: `vereador${i}@example.com`,
        password: 'password',
        cnpj: `cnpj ${i}`,
        role: 'MEMBER',
        phone: `phone ${i}`,
      })
    }

    const { pagination } = await sut.execute({
      page: 2,
    })

    expect(pagination.items).toHaveLength(2)
  })
})
