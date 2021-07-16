import { Beatmap } from '../Osu/Beatmap';
import { TaskStatus } from '../TaskManager/ducks';
import { ProgressHandler } from './Task';

export interface ConvertTask {
  id: number;
  status: TaskStatus;

  details: ConvertTaskDetails;
  onProgress?: ProgressHandler;
  onStatusChanged?: (status: TaskStatus) => void;
}

export interface ConvertTaskDetails {
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
