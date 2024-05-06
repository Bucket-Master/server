export class TaskIsNotClosedError extends Error {
  constructor() {
    super('Task is not closed.')
  }
}
