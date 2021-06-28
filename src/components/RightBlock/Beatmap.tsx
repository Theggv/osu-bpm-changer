import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import path from 'path';

import React from 'react';
import { OsuBeatmap } from '../../models/OsuBeatmap';
import { OsuBeatmapReader } from '../../models/OsuBeatmap/OsuBeatmapReader';
import { EventBackground } from '../../models/OsuBeatmap/Sections/EventsSection';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    position: 'relative',
  },
  bgImage: {
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    filter: 'brightness(70%)',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    color: 'white',
    zIndex: 1,
  },
}));

interface BeatmapProps {
  folderPath?: string;
  beatmap?: OsuBeatmap;
}

const folderPathExample =
  'D:\\osu!\\Songs\\216979 Spawn Of Possession - Apparition';
const diffPathExample =
  folderPathExample +
  '\\Spawn Of Possession - Apparition (Mazzerin) [Blind Faith].osu';

const Beatmap: React.FC<BeatmapProps> = ({ beatmap, folderPath }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [background, setBackground] = React.useState('');
  //   const [beatmap, setBeatmap] = React.useState<OsuBeatmap | undefined>(
  //     undefined
  //   );

  //   React.useEffect(() => {
  //     const wrapper = async () => {
  //       const reader = new OsuBeatmapReader();
  //       setBeatmap(await reader.parse(diffPathExample));
  //     };

  //     wrapper();
  //   }, []);

  React.useEffect(() => {
    if (!beatmap || !folderPath) return;

    beatmap.events.forEach((event) => {
      if (!(event instanceof EventBackground)) return;

      const bg = event as EventBackground;

      setBackground(path.join(folderPath, bg.filename.replaceAll('"', '')));
    });
  }, [beatmap]);

  if (!beatmap) return null;

  return (
    <Paper className={classes.root}>
      <img className={classes.bgImage} src={background} />
      <div className={classes.container}>
        <div>
          {beatmap.metadata.Artist} - {beatmap.metadata.Title} [
          {beatmap.metadata.Version}]
        </div>
        <div>by {beatmap.metadata.Creator}</div>
        <div>
          Difficulty: CS {beatmap.difficulty.CircleSize.toFixed(1)} AR{' '}
          {beatmap.difficulty.ApproachRate.toFixed(1)} OD{' '}
          {beatmap.difficulty.OverallDifficulty.toFixed(1)} HP{' '}
          {beatmap.difficulty.HPDrainRate.toFixed(1)}
        </div>
      </div>
    </Paper>
  );
};

export default Beatmap;
