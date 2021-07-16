import { Beatmap } from '../Osu/Beatmap';
import { BeatmapConverter } from './BeatmapConverter';
import { ConvertTask, ConvertTaskDetails } from './ConvertTask';
import { CancelError, Task } from './Task';

export class ConvertManager {
  /**
   * Singleton instance
   */
  private static instance?: ConvertManager;

  private static idGenerator: number = 1;

  private tasks: Map<number, { taskInfo: ConvertTask; promise: Task<Beatmap> }>;

  private constructor() {
    this.tasks = new Map();
  }

  /**
   * Access to singleton instance
   * @returns ConvertManager
   */
  public static use(): ConvertManager {
    if (!ConvertManager.instance)
      ConvertManager.instance = new ConvertManager();

    return ConvertManager.instance;
  }

  public create(details: ConvertTaskDetails): number {
    const taskInfo: ConvertTask = {
      id: ConvertManager.idGenerator++,
      status: 'pending',
      details,
    };

    const promise: Task<Beatmap> = BeatmapConverter.use(
      details.beatmapFolder,
      details.beatmap,
      details.options
    )
      .change(details.convertType, details.convertValue)
      .withProgress(
        (value) => taskInfo.onProgress && taskInfo.onProgress(value)
      );

    this.tasks.set(taskInfo.id, {
      taskInfo,
      promise,
    });

    this.startTask(taskInfo.id);

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
      else this.setStatus(task.taskInfo, 'error');
    }
  }

  private setStatus(taskInfo: ConvertTask, status: ConvertTask['status']) {
    taskInfo.status = status;
    if (taskInfo.onStatusChanged) taskInfo.onStatusChanged(status);
  }
}
