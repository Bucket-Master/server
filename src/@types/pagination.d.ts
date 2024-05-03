export interface Pagination {
  currentPage: number
  totalItems: number
  totalPages: number
  itemsPerPage: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}
