import { Pagination } from '@/@types/pagination'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchUserUseCaseRequest {
  page: number
}

interface FetchUserUseCaseResponse {
  pagination: Pagination
}

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const pagination = await this.usersRepository.fetch(page)

    return {
      pagination,
    }
  }
}
