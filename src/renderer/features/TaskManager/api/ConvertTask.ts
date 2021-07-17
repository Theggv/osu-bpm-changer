import { TaskContext, TaskStatus } from '../ducks';
import { ProgressHandler } from './Task';

export interface ConvertTask {
  id: number;

  context: TaskContext;

  onProgress?: ProgressHandler;
  onStatusChanged?: (status: TaskStatus, errorMessage?: string) => void;
}
