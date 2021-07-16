import fs from 'fs';
import path from 'path';
import React from 'react';
import { useSelector } from 'react-redux';

import { Beatmap } from '../../Osu';
import { EventBackground } from '../../Osu/Beatmap/Sections/EventsSection';
import { selectSongsFolder } from '../../selectors/OsuFolder';

declare const __static: string;

/**
 * Hook to load background image for `beatmap`
 * NOTE: folderName is not a path, just name of folder with beatmap
 * @param beatmap
 * @param folderName
 * @returns
 */
export const useOsuBackground = (beatmap?: Beatmap, folderName?: string) => {
  const [current, setCurrent] = React.useState(
    path.join(__static, 'default_bg.jpg')
  );
  const [previous, setPrevious] = React.useState(
    path.join(__static, 'default_bg.jpg')
  );

  const songsFolder = useSelector(selectSongsFolder);

  React.useEffect(() => {
    if (!beatmap || !folderName) return;

    beatmap.events.forEach((event) => {
      if (!(event instanceof EventBackground)) return;

      const bg = event as EventBackground;

      const bgPath = path.join(
        songsFolder,
        folderName,
        bg.filename.replaceAll('"', '')
      );

      if (fs.existsSync(bgPath)) {
        setCurrent((prev) => {
          setPrevious(prev);
          return bgPath;
        });
      }
    });
  }, [beatmap, folderName]);

  return {
    previous,
    current,
    previousUrl: previous.replaceAll('#', '%23'),
    currentUrl: current.replaceAll('#', '%23'),
  };
};
