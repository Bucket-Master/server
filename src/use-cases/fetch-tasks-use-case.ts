import { Pagination } from '@/@types/pagination'
import { TasksRepository } from '@/repositories/tasks-repository'

interface FetchTaskUseCaseRequest {
  userId: string
  page: number
}

interface FetchTaskUseCaseResponse {
  pagination: Pagination
}

export class FetchTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
    page,
  }: FetchTaskUseCaseRequest): Promise<FetchTaskUseCaseResponse> {
    const pagination = await this.tasksRepository.fetch(userId, page)

    return {
      pagination,
    }
  }
}
