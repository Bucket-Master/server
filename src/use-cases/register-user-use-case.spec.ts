import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { RegisterUserUseCase } from './register-user-use-case'

let userRepository: UsersRepository
let sut: RegisterUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(userRepository)
  })

  it('should be able create a user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cnpj: '12345678910',
      phone: '(34) 9 9999-9999',
    })

    expect(user.email).toEqual('johndoe@example.com')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should be hash user password upon register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cnpj: '12345678910',
      phone: '(34) 9 9999-9999',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jhondoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      cnpj: '12345678910',
      phone: '(34) 9 9999-9999',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        cnpj: '12345678910',
        phone: '(34) 9 9999-9999',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
