import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: data.id ?? randomUUID(),
      email: data.email,
      password: data.password,
      companyName: data.companyName ?? null,
      name: data.name,
      cnpj: data.cnpj,
      phone: data.phone,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async edit(
    userId: string,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    const index = this.items.findIndex((item) => item.id === userId)

    const user = <User>{ ...this.items[index], ...data }

    return user
  }
}