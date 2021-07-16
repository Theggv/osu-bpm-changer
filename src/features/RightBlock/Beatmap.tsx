import React from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StyledTextField from '../../shared/components/StyledTextField';
import { analyzeBPM } from '../../shared/ConvertManager/SpeedChanger';
import { Beatmap } from '../../shared/Osu/Beatmap';
import { createTask } from '../../shared/TaskManager';
import { useInput } from '../../shared/utils/hooks/useInput';
import { useOsuBackground } from '../../shared/utils/hooks/useOsuBackground';

const useStyles = makeStyles((_theme) => ({
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
    filter: 'brightness(50%)',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    color: 'white',
    zIndex: 1,
  },
  whiteText: {
    color: 'white',
  },
  convert: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

interface BeatmapProps {
  folderPath: string;
  beatmap: Beatmap;
}

const BeatmapView: React.FC<BeatmapProps> = ({ beatmap, folderPath }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const convertType = useInput('multiplier');
  const convertValue = useInput('1');

  const background = useOsuBackground(beatmap, folderPath);
  const [animTrigger, setAnimTrigger] = React.useState(true);

  React.useEffect(() => {
    setAnimTrigger(false);
    setAnimTrigger(true);
  }, [background.previous]);

  const beatmapBPM = analyzeBPM(beatmap);

  const onClick = () => {
    dispatch(
      createTask({
        beatmap,
        beatmapFolder: folderPath,
        convertType: convertType.value as 'bpm' | 'multiplier',
        convertValue: Number(convertValue.value),
      })
    );
  };

  if (!beatmap || !folderPath) return null;

  return (
    <Paper className={classes.root}>
      <CSSTransition in={animTrigger} timeout={2500} classNames={'img-anim'}>
        <img className={classes.bgImage} src={background.currentUrl} />
      </CSSTransition>
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
        {beatmapBPM.min.toFixed(0) === beatmapBPM.max.toFixed(0) ? (
          <div>{beatmapBPM.mean.toFixed(0)} BPM</div>
        ) : (
          <div>
            {beatmapBPM.min.toFixed(0)} - {beatmapBPM.max.toFixed(0)} (
            {beatmapBPM.mean.toFixed(0)}) BPM
          </div>
        )}
        <div className={classes.convert}>
          <FormControl>
            <Select
              className={classes.whiteText}
              {...convertType.bind}
              color={'primary'}
            >
              <MenuItem value={'bpm'}>BPM</MenuItem>
              <MenuItem value={'multiplier'}>Multiplier</MenuItem>
            </Select>
          </FormControl>
          <StyledTextField
            variant={'outlined'}
            className={classes.whiteText}
            placeholder={'value'}
            color={'primary'}
            {...convertValue.bind}
          />
          <Button className={classes.whiteText} onClick={onClick}>
            Convert
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default BeatmapView;
