import path from 'path';
import find from 'find-process';
import fs from 'fs';
import { BeatmapSetFolder } from './BeatmapSet';
import { Beatmap } from './Beatmap';

export const tryFindOsuFolder = async (): Promise<string | null> => {
  try {
    const res = await find('name', 'osu!', true);

    if (!res || !res.length) return null;

    const base = res[0].cmd.replace('"', '');

    const songsPath = path.join(base.substring(0, base.indexOf('osu!.exe')));

    return songsPath;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Read songs from osu!/Songs folder
 * @param path path to osu! folder without /Songs
 * @returns
 */
export const readSongsFolder = async (
  osuPath: string
): Promise<BeatmapSetFolder[]> => {
  return new Promise(async (resolve, reject) => {
    if (!(await isOsuFolder(osuPath))) {
      reject(new Error(`${osuPath} is not osu! folder.`));
    }

    const songsPath = path.join(osuPath, 'Songs');

    fs.readdir(songsPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(
        files
          .filter((dir) => dir.isDirectory())
          .map((dir) => dir.name)
          .map((dir) => ({
            ...parseSongFolder(dir),
            folderName: dir,
            fullPath: path.join(songsPath, dir),
          }))
      );
    });
  });
};

export const isOsuFolder = async (path: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let exeFound = false;
    let folderFound = false;

    fs.readdir(path, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      files.forEach((file) => {
        if (!file.isDirectory() && file.name === 'osu!.exe') exeFound = true;
        if (file.isDirectory() && file.name === 'Songs') folderFound = true;
      });

      resolve(exeFound && folderFound);
    });
  });
};

export const parseSongFolder = (
  song: string
): { beatmapId?: number; artist?: string; title?: string } => {
  // {Beatmap number} {Artist} - {Song Title}.
  const regexp = /([0-9]+)\s(.+)\s-\s(.+)/;

  if (regexp.test(song)) {
    const matches = regexp.exec(song);

    return {
      beatmapId: Number(matches![1]),
      artist: matches![2],
      title: matches![3].replaceAll('[no video]', '').trim(),
    };
  }

  return {};
};

export const generateFileName = (beatmap: Beatmap): string => {
  return (
    `${beatmap.metadata.Artist} - ${beatmap.metadata.Title} ` +
    `(${beatmap.metadata.Creator}) [${beatmap.metadata.Version}].osu`
  );
};
