import { Beatmap } from '../../../shared/Osu';
import { TaskContext, TaskState } from '../ducks';
import { BeatmapConverter } from './BeatmapConverter';
import { ConvertTask } from './ConvertTask';
import { CancelError, Task } from './Task';

export class TaskManager {
  /**
   * Singleton instance
   */
  private static instance?: TaskManager;

  private static idGenerator: number = 1;

  private tasks: Map<number, { taskInfo: ConvertTask; promise: Task<void> }>;

  private constructor() {
    this.tasks = new Map();
  }

  /**
   * Access to singleton instance
   * @returns ConvertManager
   */
  public static use(): TaskManager {
    if (!TaskManager.instance) TaskManager.instance = new TaskManager();

    return TaskManager.instance;
  }

  public create(context: TaskContext): number {
    const taskInfo: ConvertTask = {
      id: TaskManager.idGenerator++,
      context,
    };

    const promise = BeatmapConverter.use(
      context.beatmapFolder,
      context.beatmap,
      context.options
    )
      .change(context.convertType, context.convertValue)
      .withProgress(
        (value) => taskInfo.onProgress && taskInfo.onProgress(value)
      );

    this.tasks.set(taskInfo.id, {
      taskInfo,
      promise,
    });

    return taskInfo.id;
  }

  public get(id: number): ConvertTask | undefined {
    return this.tasks.get(id)?.taskInfo;
  }

  public cancel(id: number) {
    const task = this.tasks.get(id);

    if (!task) return;

    task.promise.cancel();
  }

  public start(id: number) {
    this.startTask(id);
  }

  private async startTask(id: number) {
    const task = this.tasks.get(id);
    if (!task) return;

    try {
      this.setStatus(task.taskInfo, 'running');
      await task.promise;
      this.setStatus(task.taskInfo, 'done');
    } catch (error) {
      if (error instanceof CancelError)
        this.setStatus(task.taskInfo, 'canceled');
      else this.setStatus(task.taskInfo, 'error', (error as any).message);
    }
  }

  private setStatus(
    taskInfo: ConvertTask,
    status: TaskState['status'],
    errorMessage?: TaskState['errorMessage']
  ) {
    if (taskInfo.onStatusChanged)
      taskInfo.onStatusChanged(status, errorMessage);
  }
}
