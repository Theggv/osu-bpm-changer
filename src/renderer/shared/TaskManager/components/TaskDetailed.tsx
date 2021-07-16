import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

import { ConvertTask } from '../../../shared/ConvertManager/ConvertTask';
import StyledLinearProgress from '../../components/StyledLinearProgress';
import { setStatus, TaskState } from '../ducks';

const useStyles = makeStyles((_theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 10,
    borderRadius: 8,
    border: '#fff 1px solid',
    color: '#fff',
    backgroundColor: '#0004',
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
    lineClamp: 1,
    display: 'box',
    wordWrap: 'break-word',
    boxOrient: 'vertical',
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
  button: {
    color: '#fff',
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

interface TaskProps {
  taskState: TaskState;
  taskDetails: ConvertTask['details'];
}

export const TaskDetailed: React.FC<TaskProps> = ({
  taskDetails,
  taskState,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cancelTask = () => {
    if (
      taskState.status !== 'canceled' &&
      taskState.status !== 'error' &&
      taskState.status !== 'done' &&
      taskState.status !== 'closed'
    ) {
      dispatch(
        setStatus({
          taskId: taskState.taskId,
          status: 'canceled',
        })
      );
    }
  };

  return (
    <div className={classes.root}>
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
        <StyledLinearProgress
          className={clsx(
            classes.progress,
            taskState.status === 'canceled' && classes.canceled,
            taskState.status === 'error' && classes.error,
            taskState.status === 'done' && classes.done
          )}
          variant={'determinate'}
          value={
            taskState.status === 'canceled' ||
            taskState.status === 'error' ||
            taskState.status === 'done'
              ? 100
              : taskState.progress
          }
          color={'secondary'}
        />
        <IconButton
          className={classes.button}
          size={'small'}
          onClick={cancelTask}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};
