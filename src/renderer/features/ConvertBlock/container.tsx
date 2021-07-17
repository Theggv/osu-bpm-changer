import clsx from 'clsx';
import path from 'path';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { selectSelectedDiff } from '../../shared/BeatmapSetsList';
import { analyzeBPM } from '../../shared/Osu';
import { selectSongsFolder } from '../../shared/selectors/OsuFolder';
import { createTask } from '../TaskManager';
import SliderWithInput from './components/SliderWithInput';
import SliderWithTitle from './components/SliderWithTitle';
import TypeSwitcher from './components/TypeSwitcher';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    paddingTop: 32,
    color: theme.palette.text.secondary,
    backgroundColor: '#0004',
    marginTop: 32,
    marginBottom: 64,
  },
  block: {
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonConvert: {
    width: 125,
  },
}));

const useInputNumber = (initialValue: number) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  return {
    value,
    setValue,
    bind: {
      value,
      onChange,
    },
  };
};

const useInputBoolean = (initialValue: boolean) => {
  const [checked, setChecked] = React.useState(initialValue);

  const onChange = (_event: any, newValue: boolean) => {
    setChecked(newValue);
  };

  return {
    checked,
    setChecked,
    bind: {
      checked,
      onChange,
    },
  };
};

const StyledButton = withStyles((_theme) => ({
  label: {
    color: '#fff',
    fontWeight: 600,
    textTransform: 'none',
  },
  outlined: {
    color: '#fff',
    borderColor: '#fff',
  },
}))(Button);

const ConvertBlock: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentBeatmap = useSelector(selectSelectedDiff);
  const osuSongsFolder = useSelector(selectSongsFolder);

  const inputCS = useInputNumber(4);
  const inputAR = useInputNumber(9);
  const inputOD = useInputNumber(8);
  const inputHP = useInputNumber(6);

  // false = Multiplier, true = bpm
  const inputType = useInputBoolean(false);
  const inputValue = useInputNumber(1);

  // Update Parameters on beatmap changes
  React.useEffect(() => {
    if (!currentBeatmap.difficulty) return;

    inputCS.setValue(currentBeatmap.difficulty?.difficulty.CircleSize);
    inputAR.setValue(currentBeatmap.difficulty?.difficulty.ApproachRate);
    inputOD.setValue(currentBeatmap.difficulty?.difficulty.OverallDifficulty);
    inputHP.setValue(currentBeatmap.difficulty?.difficulty.HPDrainRate);

    if (inputType.checked) inputValue.setValue(Math.round(beatmapBPM.mean));
    else inputValue.setValue(1);
  }, [currentBeatmap.difficulty, inputType.checked]);

  if (!currentBeatmap.difficulty) return null;

  const beatmapBPM = analyzeBPM(currentBeatmap.difficulty);

  // Create task on button click
  const onClickConvert = () => {
    dispatch(
      createTask({
        beatmap: currentBeatmap.difficulty!,
        beatmapFolder: path.join(
          osuSongsFolder,
          currentBeatmap.beatmapSet!.folderName
        ),
        convertType: inputType.checked ? 'bpm' : 'multiplier',
        convertValue: inputValue.value,
        options: {
          approachRate: inputAR.value,
          hpDrain: inputHP.value,
          circleSize: inputCS.value,
          overallDiff: inputOD.value,
        },
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={clsx(classes.title, classes.block)}>Beatmap settings</div>
      <SliderWithTitle
        title={'CS'}
        defaultValue={4}
        min={2}
        max={7}
        {...inputCS.bind}
      />
      <SliderWithTitle
        title={'AR'}
        defaultValue={9}
        min={0}
        max={10}
        {...inputAR.bind}
      />
      <SliderWithTitle
        title={'OD'}
        defaultValue={8}
        min={0}
        max={10}
        {...inputOD.bind}
      />
      <SliderWithTitle
        title={'HP'}
        defaultValue={6}
        min={0}
        max={10}
        {...inputHP.bind}
      />
      <div className={clsx(classes.title, classes.block)}>Speed settings</div>
      <div className={clsx(classes.block)}>
        <TypeSwitcher {...inputType.bind} />
      </div>
      <SliderWithInput
        title={inputType.checked ? 'BPM' : 'Multiplier'}
        defaultValue={inputType.checked ? 1 : 1}
        min={inputType.checked ? 1 : 0.2}
        max={inputType.checked ? 1000 : 3}
        step={inputType.checked ? 1 : 0.05}
        {...inputValue.bind}
      />
      <div className={classes.footer}>
        <StyledButton
          className={classes.buttonConvert}
          variant={'outlined'}
          onClick={onClickConvert}
        >
          Convert
        </StyledButton>
      </div>
    </div>
  );
};

export default ConvertBlock;
