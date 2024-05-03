import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { EditUserUseCase } from './edit-user-use-case'

let usersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('Edit User Use Case', async () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(usersRepository)

    await usersRepository.create({
      id: 'user-01',
      name: 'Jogn Doe',
      email: 'johndoe@example.com',
      password: '123456',
      companyName: 'John Company',
      cnpj: 'cnpj-test',
      phone: 'phone-test',
      role: 'USER',
    })
  })

  it('should be able edit user', async () => {
    const { user } = await sut.execute({
      userId: 'user-01',
      data: {
        name: 'John Doe',
        companyName: 'John Enterprise',
      },
    })

    expect(user).not.toEqual(null)
    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        companyName: 'John Enterprise',
      }),
    )
  })

  it('should not be able edit user with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-02',
        data: {
          name: 'John Doe',
          companyName: 'John Enterprise',
        },
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
