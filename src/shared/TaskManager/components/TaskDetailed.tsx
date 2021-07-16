import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

import React from 'react';

import { ConvertTask } from '../../../shared/ConvertManager/ConvertTask';
import { TaskState } from '../ducks';

const useStyles = makeStyles((_theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 10,
  },
  progressContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    height: 30,
  },
  status: {
    marginTop: 3,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& div': {
      flex: 1,
    },
  },
  progress: {
    flex: 1,
  },
}));

interface TaskProps {
  taskState: TaskState;
  taskDetails: ConvertTask['details'];
}

export const TaskDetailed: React.FC<TaskProps> = ({
  taskDetails,
  taskState,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.title}>
        {taskDetails.beatmap.metadata.Artist} -{' '}
        {taskDetails.beatmap.metadata.Title} [
        {taskDetails.beatmap.metadata.Version}]
      </div>
      <div className={classes.status}>
        <div>
          {taskDetails.convertValue}
          {taskDetails.convertType === 'bpm' ? 'BPM' : 'x'}
        </div>
        <div>{taskState.status}</div>
      </div>
      <div className={classes.progressContainer}>
        <LinearProgress
          className={classes.progress}
          variant={'determinate'}
          value={taskState.progress}
          color={'secondary'}
        />
        <IconButton color={'secondary'} size={'small'}>
          <ClearIcon />
        </IconButton>
      </div>
    </Card>
  );
};
