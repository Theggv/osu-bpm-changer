import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

import { ConvertTask } from '../../../shared/ConvertManager/ConvertTask';
import StyledLinearProgress from '../../components/StyledLinearProgress';
import { TaskState } from '../ducks';

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
          className={classes.progress}
          variant={'determinate'}
          value={taskState.progress}
          color={'secondary'}
        />
        <IconButton className={classes.button} size={'small'}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};
