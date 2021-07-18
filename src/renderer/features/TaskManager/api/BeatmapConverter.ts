import { spawn } from 'child_process';
import fs from 'fs';
import { cloneDeep } from 'lodash';
import path from 'path';

import {
  analyzeBPM,
  Beatmap,
  changeBPM,
  generateFileName,
  multiplyBPM,
  OsuBeatmapWriter,
} from '../../../shared/Osu';
import { TaskContext } from '../ducks';
import { Task } from './Task';

export class BeatmapConverter {
  private beatmapFolder: TaskContext['beatmapFolder'];
  private beatmap: TaskContext['beatmap'];
  private options?: TaskContext['options'];

  private tempFilesForCleanup: string[];
  private tempFilesFull: string[];

  private constructor(
    beatmapFolder: TaskContext['beatmapFolder'],
    beatmap: TaskContext['beatmap'],
    options?: {
      circleSize: number;
      approachRate: number;
      overallDiff: number;
      hpDrain: number;
    }
  ) {
    this.beatmapFolder = beatmapFolder;
    this.beatmap = beatmap;
    this.options = options;

    this.tempFilesForCleanup = [];
    this.tempFilesFull = [];
  }

  public static use(
    beatmapFolder: TaskContext['beatmapFolder'],
    beatmap: TaskContext['beatmap'],
    options?: {
      circleSize: number;
      approachRate: number;
      overallDiff: number;
      hpDrain: number;
    }
  ): BeatmapConverter {
    return new BeatmapConverter(beatmapFolder, beatmap, options);
  }

  public change(
    type: TaskContext['convertType'],
    value: TaskContext['convertValue']
  ): Task<void> {
    return new Task(async (resolve, reject, progress, onCancel) => {
      const converted = cloneDeep(this.beatmap);

      const convertMapTask = this.convertMap(type, value, converted);
      const convertSoundTask = this.convertSound(type, value).withProgress(
        (value) => {
          progress(value);
        }
      );

      onCancel(() => {
        convertMapTask.cancel();
        convertSoundTask.cancel();
      });

      try {
        progress(0);
        await convertMapTask;
        await convertSoundTask;
        progress(100);

        await this.changeMetadata(type, value, converted);

        await this.cleanup();

        resolve();
      } catch (error) {
        try {
          await this.cleanup(true);
        } catch {}

        reject(error);
      }
    });
  }

  private convertMap(
    type: TaskContext['convertType'],
    value: TaskContext['convertValue'],
    beatmap: TaskContext['beatmap']
  ): Task<void> {
    return new Task((resolve, _reject, _progress, _onCancel) => {
      if (type === 'bpm') {
        changeBPM(beatmap, value);
      } else {
        multiplyBPM(beatmap, value);
      }

      resolve();
    });
  }

  private async changeMetadata(
    type: TaskContext['convertType'],
    value: TaskContext['convertValue'],
    beatmap: TaskContext['beatmap']
  ): Promise<void> {
    const ratio =
      type === 'multiplier' ? value : value / analyzeBPM(this.beatmap).mean;

    beatmap.general.AudioFilename =
      beatmap.general.AudioFilename.replace('.mp3', '') +
      `-x${ratio.toFixed(2)}.mp3`;

    if (type === 'multiplier')
      beatmap.metadata.Version =
        beatmap.metadata.Version + ` ${value.toFixed(2)}x`;
    else
      beatmap.metadata.Version =
        beatmap.metadata.Version + ` ${value.toFixed(0)}BPM`;

    // Apply options
    if (this.options) {
      beatmap.difficulty.ApproachRate = this.options.approachRate;
      beatmap.difficulty.OverallDifficulty = this.options.overallDiff;
      beatmap.difficulty.HPDrainRate = this.options.hpDrain;
      beatmap.difficulty.CircleSize = this.options.circleSize;
    }

    const writer = new OsuBeatmapWriter();
    const beatmapPath = path.join(
      this.beatmapFolder,
      generateFileName(beatmap)
    );

    await writer.write(beatmapPath, beatmap);

    this.tempFilesFull.push(beatmapPath);
  }

  private convertSound(
    type: TaskContext['convertType'],
    value: TaskContext['convertValue']
  ): Task<void> {
    const ratio =
      type === 'multiplier' ? value : value / analyzeBPM(this.beatmap).mean;

    const originalPath = path.join(
      this.beatmapFolder,
      this.beatmap.general.AudioFilename
    );

    const decodePath = path.join(
      this.beatmapFolder,
      this.beatmap.general.AudioFilename.replace('.mp3', '') + '-orig.wav'
    );

    const stretchPath =
      decodePath.replace('-orig.wav', '') + `-x${ratio.toFixed(2)}.wav`;

    const encodePath = stretchPath.replace(
      `-x${ratio.toFixed(2)}.wav`,
      '' + `-x${ratio.toFixed(2)}.mp3`
    );

    return new Task(async (resolve, reject, progress, onCancel) => {
      const decodeTask = this.useLame([
        '--decode',
        originalPath,
        decodePath,
      ]).withProgress((value) => {
        progress((value / 100) * 50);
      });

      const stretchTask = this.useStretchSound([
        decodePath,
        stretchPath,
        `-tempo=${(ratio - 1) * 100}`,
      ]).withProgress((value) => {
        progress(50 + (value / 100) * 10);
      });

      const encodeTask = this.useLame([stretchPath, encodePath]).withProgress(
        (value) => {
          progress(60 + (value / 100) * 40);
        }
      );

      onCancel(() => {
        decodeTask.cancel();
        stretchTask.cancel();
        encodeTask.cancel();
      });

      try {
        // We can skip step if converted sound file exists
        if (fs.existsSync(encodePath)) {
          resolve();
          return;
        }

        this.tempFilesForCleanup = [
          ...this.tempFilesForCleanup,
          decodePath,
          stretchPath,
        ];

        this.tempFilesFull = [...this.tempFilesForCleanup, encodePath];

        await decodeTask;
        progress(50);
        await stretchTask;
        progress(60);
        await encodeTask;
        progress(100);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private useLame(lameArgs: string[]): Task<void> {
    const lamePath = path.join(__dirname, '../assets/lame.exe');

    return new Task((resolve, reject, progress, onCancel) => {
      const process = spawn(lamePath, lameArgs, {
        stdio: ['inherit'],
      });

      let currentFrames = 0;
      let totalFrames = 0;
      let oldProgress = 0;

      onCancel(() => {
        process.kill();
      });

      process.on('close', () => {
        resolve();
      });

      process.stderr?.on('data', (data) => {
        const str: string = data.toString();

        if (str) {
          if (str.includes('Error')) {
            reject(new Error(str));
          }

          const args = str
            .split(' ')
            .map((i) => i.trim())
            .filter((i) => i);

          if (args) {
            if (args[0] === 'Frame#' && args.length > 2)
              [currentFrames, totalFrames] = args[1].split('/').map(Number);
            else if (args[0])
              [currentFrames, totalFrames] = args[0].split('/').map(Number);

            if (oldProgress < currentFrames / totalFrames - 0.05) {
              oldProgress = currentFrames / totalFrames;
              progress && progress(oldProgress * 100);
            }
          }
        } else resolve();
      });
    });
  }

  private useStretchSound(soundStretchArgs: string[]): Task<void> {
    const stretchPath = path.join(__dirname, '../assets/soundstretch.exe');

    return new Task((resolve, reject, _, onCancel) => {
      const process = spawn(stretchPath, soundStretchArgs);

      onCancel(() => {
        process.kill();
      });

      process.on('close', () => {
        resolve();
      });

      process.stderr.on('data', (_data) => {});

      process.on('error', (err) => {
        reject(err);
      });
    });
  }

  private cleanup(isFull: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isFull) {
        this.tempFilesFull.forEach((file) => {
          fs.unlink(file, (err) => {
            if (err) reject(err);
          });
        });
        this.tempFilesFull = [];
      } else {
        this.tempFilesForCleanup.forEach((file) => {
          fs.unlink(file, (err) => {
            if (err) reject(err);
          });
        });
      }
      this.tempFilesForCleanup = [];
      resolve();
    });
  }
}
