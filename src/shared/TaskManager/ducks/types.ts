export type TaskStatus =
  | 'pending'
  | 'running'
  | 'done'
  | 'error'
  | 'canceled'
  | 'closed';

export interface TaskState {
  taskId: number;
  status: TaskStatus;
  customStatus?: string;
  progress: number;
  options?: {
    circleSize: number;
    approachRate: number;
    overallDiff: number;
    hpDrain: number;
  };
}

export interface TaskManagerState {
  tasks: TaskState[];
}
