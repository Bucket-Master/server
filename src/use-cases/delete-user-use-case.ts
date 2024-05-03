import { UsersRepository } from '@/repositories/users-repository'

interface DeleteUserUseCaseRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error()
    }

    await this.usersRepository.delete(userId)
  }
}
