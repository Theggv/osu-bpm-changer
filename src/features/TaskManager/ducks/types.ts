export enum TaskState {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED',
}

export interface TaskStore {
  taskId: number;
  state: TaskState;
  progress: number;
}
