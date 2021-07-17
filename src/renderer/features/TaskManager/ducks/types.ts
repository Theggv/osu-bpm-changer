import { Beatmap } from '../../../shared/Osu';

export type TaskStatus =
  | 'pending'
  | 'running'
  | 'done'
  | 'error'
  | 'canceled'
  | 'closed';

export interface TaskContext {
  beatmapFolder: string;
  beatmap: Beatmap;

  convertType: 'multiplier' | 'bpm';
  convertValue: number;

  options?: {
    circleSize: number;
    approachRate: number;
    overallDiff: number;
    hpDrain: number;
  };
}

export interface TaskState {
  taskId: number;
  context: TaskContext;
  status: TaskStatus;
  progress: number;
  errorMessage?: string;
}

export interface TaskManagerState {
  tasks: TaskState[];
  runningTasks: number[];
}
