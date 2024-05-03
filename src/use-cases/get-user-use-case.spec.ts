import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetUserUseCase } from './get-user-use-case'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get User Use Case', async () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)

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
  })

  it('should be able to get user', async () => {
    const { user } = await sut.execute({
      userId: 'user-01',
    })

    expect(user).not.toEqual(null)
    expect(user.id).toEqual('user-01')
  })

  it('should not be able get user with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-02',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
