import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditUserUseCaseRequest {
  userId: string
  data: Prisma.UserUncheckedUpdateInput
}

interface EditUserUseCaseResponse {
  user: User
}

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const updatedUser = await this.usersRepository.edit(userId, data)

    return {
      user: updatedUser,
    }
  }
}
