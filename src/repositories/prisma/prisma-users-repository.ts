import { Prisma, User } from '@prisma/client'

import { Pagination } from '@/@types/pagination'
import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async fetch(page: number): Promise<Pagination> {
    const totalItems = await prisma.user.count()

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        companyName: true,
        createdAt: true,
        role: true,
      },
      orderBy: {
        name: 'asc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const totalPages = Math.ceil(totalItems / 20)

    const itemsPerPage = page === totalPages ? totalItems % 20 : 20

    return {
      currentPage: page,
      totalItems,
      totalPages,
      itemsPerPage,
      items: users,
    }
  }

  async edit(
    userId: string,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })

    return user
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
