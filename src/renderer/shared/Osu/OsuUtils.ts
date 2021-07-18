import fs from 'fs';
import path from 'path';

import { Beatmap } from './Beatmap';
import { BeatmapSetFolder } from './BeatmapSet';

/**
 * Read songs from osu!/Songs folder
 * @param path path to osu! folder without /Songs
 * @returns
 */
export const readSongsFolder = async (
  osuPath: string
): Promise<BeatmapSetFolder[]> => {
  return new Promise(async (resolve, reject) => {
    const isValid = await isOsuFolder(osuPath);

    if (!isValid) {
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
): {
  parsed: BeatmapSetFolder['parsed'];
} => {
  // {Beatmap number} {Artist} - {Song Title}.
  const regexp = /([0-9]+)\s(.+)\s-\s(.+)/;

  if (regexp.test(song)) {
    const matches = regexp.exec(song);

    return {
      parsed: {
        beatmapId: Number(matches![1]),
        artist: matches![2],
        title: matches![3].replaceAll('[no video]', '').trim(),
      },
    };
  }

  return { parsed: {} };
};

export const generateFileName = (beatmap: Beatmap): string => {
  return (
    `${escape(beatmap.metadata.Artist)} - ${escape(beatmap.metadata.Title)} ` +
    `(${escape(beatmap.metadata.Creator)}) [${escape(
      beatmap.metadata.Version
    )}].osu`
  );
};

const escape = (str: string): string => {
  return str.replaceAll('*', '');
};
