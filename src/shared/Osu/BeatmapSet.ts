import fs from 'fs';
import path from 'path';
import { Beatmap } from './Beatmap';
import { OsuBeatmapReader } from './BeatmapReader';

export interface BeatmapSetFolder {
  folderName: string;
  parsed: {
    beatmapId?: number;
    artist?: string;
    title?: string;
  };
}

export const readBeatmapSetFolder = (
  songsFolder: string,
  beatmapSet: BeatmapSetFolder
): Promise<Beatmap[]> => {
  const fullPath = path.join(songsFolder, beatmapSet.folderName);

  return new Promise((resolve, reject) => {
    fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
      if (err) reject(err);

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
              await reader.parse(path.join(fullPath, beatmap.name))
          )
      ).then((result) => {
        console.log(result);
        resolve(result);
      });
    });
  });
};
