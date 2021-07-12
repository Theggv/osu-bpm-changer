import { Beatmap } from '../Osu/Beatmap';
import { ProgressHandler } from './Task';

export interface ConvertTask {
  id: number;
  status: 'waiting' | 'running' | 'calceled' | 'done';

  details: ConvertTaskDetails;
  onProgress?: ProgressHandler;
}

export interface ConvertTaskDetails {
  beatmapFolder: string;
  beatmap: Beatmap;

  convertType: 'multiplier' | 'bpm';
  convertValue: number;
}
