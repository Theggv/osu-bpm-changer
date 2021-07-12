import { ConvertTask, ConvertTaskDetails } from './ConvertTask';
import { Task } from './Task';
import { Beatmap } from '../Osu/Beatmap';
import { BeatmapConverter } from './BeatmapConverter';

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
      status: 'waiting',
      details,
    };

    const promise: Task<Beatmap> = BeatmapConverter.use(
      details.beatmapFolder,
      details.beatmap
    ).change(details.convertType, details.convertValue);

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
    task.taskInfo.status = 'calceled';
  }
}
