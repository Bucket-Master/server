import { Prisma, User } from '@prisma/client'

import { Pagination } from '@/@types/pagination'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  edit(userId: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  fetch(page: number): Promise<Pagination>
}
