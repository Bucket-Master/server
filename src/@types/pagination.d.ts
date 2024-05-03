export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}
