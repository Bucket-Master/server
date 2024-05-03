import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

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
      throw new Error()
    }

    const updatedUser = await this.usersRepository.edit(userId, data)

    return {
      user: updatedUser,
    }
  }
}
