import clsx from 'clsx';
import path from 'path';
import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { selectSelectedDiff } from '../../BeatmapSetsList';
import StyledLinearProgress from '../../components/StyledLinearProgress';
import { ConvertManager } from '../../ConvertManager';
import { ConvertTask } from '../../ConvertManager/ConvertTask';
import { selectSongsFolder } from '../../selectors/OsuFolder';
import { selectTasks } from '../ducks';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    maxHeight: 50,
  },
  top: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    flex: 1,
    marginBottom: 8,
  },
  bottom: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 12,
    color: theme.palette.secondary.contrastText,

    '& div': {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  done: {
    '& .MuiLinearProgress-barColorSecondary': {
      backgroundColor: '#50f533',
    },
  },
  error: {
    '& .MuiLinearProgress-barColorSecondary': {
      backgroundColor: '#fa4a37',
    },
  },
  canceled: {
    '& .MuiLinearProgress-barColorSecondary': {
      backgroundColor: '#0004',
    },
  },
}));

export const TaskMin: React.FC = () => {
  const classes = useStyles();

  const [currentTask, setCurrentTask] = React.useState<ConvertTask | undefined>(
    undefined
  );

  const tasks = useSelector(selectTasks);
  const selectedDiff = useSelector(selectSelectedDiff);
  const songsFolder = useSelector(selectSongsFolder);

  React.useEffect(() => {
    // Высший приоритет - +дифа
    // Высокий - +мапсет
    // Средний - запущенные задачи
    // Низкий - остальное
    // Сортировка по id (первые первыми)

    const lowPriority = tasks.map((task) =>
      ConvertManager.use().get(task.taskId)
    );

    const mediumPriority = lowPriority.filter((task) => {
      return task?.status === 'running';
    });

    const highPriority = mediumPriority.filter((task) => {
      return (
        task?.details.beatmapFolder ===
        path.join(songsFolder, selectedDiff.beatmapSet?.folderName || '')
      );
    });

    const highestPriority = highPriority.filter((task) => {
      return (
        task?.details.beatmap.metadata.Version ===
        selectedDiff.difficulty?.metadata.Version
      );
    });

    setCurrentTask(
      highestPriority.length
        ? highestPriority[0]
        : highPriority.length
        ? highPriority[0]
        : mediumPriority.length
        ? mediumPriority[0]
        : lowPriority.length
        ? lowPriority[lowPriority.length - 1]
        : undefined
    );
  }, [tasks, selectedDiff]);

  if (!currentTask) return null;

  const taskState = tasks.find((x) => x.taskId === currentTask.id);

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <StyledLinearProgress
          className={clsx(
            classes.progress,
            taskState?.status === 'canceled' && classes.canceled,
            taskState?.status === 'error' && classes.error,
            taskState?.status === 'done' && classes.done
          )}
          variant={'determinate'}
          value={
            taskState?.status === 'canceled' ||
            taskState?.status === 'error' ||
            taskState?.status === 'done'
              ? 100
              : taskState?.progress
              ? taskState?.progress
              : 0
          }
          color={'secondary'}
        />
      </div>
      <div className={classes.bottom}>
        <div>
          {currentTask.details.beatmap.metadata.Artist} -{' '}
          {currentTask.details.beatmap.metadata.Title} [
          {currentTask.details.beatmap.metadata.Version}]
        </div>
        <div>
          {currentTask.details.convertValue}
          {currentTask.details.convertType === 'bpm' ? 'BPM' : 'x'}
        </div>
        <div>{taskState?.status}</div>
      </div>
    </div>
  );
};
