import fs from 'fs';
import path from 'path';
import { Beatmap } from './Beatmap';
import { OsuBeatmapReader } from './BeatmapReader';

export interface BeatmapSetFolder {
  beatmapId?: number;
  artist?: string;
  title?: string;
  fullPath: string;
  folderName: string;
}

export const readMapset = (
  beatmapSet: BeatmapSetFolder
): Promise<Beatmap[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(beatmapSet.fullPath, { withFileTypes: true }, (err, files) => {
      if (err) reject(err);
      console.log(beatmapSet.fullPath);

      const reader = new OsuBeatmapReader();

      Promise.all(
        files
          .filter(
            (file) =>
              file.isFile() &&
              file.name.substring(file.name.length - 4).toLowerCase() === '.osu'
          )
          .map(
            async (beatmap) =>
              await reader.parse(path.join(beatmapSet.fullPath, beatmap.name))
          )
      ).then((result) => {
        console.log(result);
        resolve(result);
      });
    });
  });
};
