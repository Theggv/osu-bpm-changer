import clsx from 'clsx';
import { clipboard } from 'electron';
import React from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';

import StyledLinearProgress from '../../../shared/components/StyledLinearProgress';
import { removeTask, setStatus, TaskState } from '../ducks';

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

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 275,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

interface TaskProps {
  taskState: TaskState;
}

export const TaskDetailed: React.FC<TaskProps> = ({ taskState }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { context, progress, status, errorMessage } = taskState;

  const cancelTask = () => {
    if (status !== 'canceled' && status !== 'error' && status !== 'done') {
      dispatch(
        setStatus({
          taskId: taskState.taskId,
          status: 'canceled',
        })
      );
    } else {
      dispatch(removeTask(taskState.taskId));
    }
  };

  const errorBlock = errorMessage ? (
    <>
      <div style={{ fontSize: 14, marginBottom: 2 }}>
        Failed to convert map:
      </div>
      <div style={{ fontSize: 12, color: 'red', marginBottom: 2 }}>
        {errorMessage}
      </div>
      <div style={{ fontSize: 12, color: 'gray' }}>
        Click on the tile to copy error text
      </div>
    </>
  ) : (
    ''
  );

  return (
    <HtmlTooltip placement={'top'} title={errorBlock}>
      <div
        className={classes.root}
        onClick={() => errorMessage && clipboard.writeText(errorMessage)}
      >
        <div className={classes.title}>
          {context.beatmap.metadata.Artist} - {context.beatmap.metadata.Title} [
          {context.beatmap.metadata.Version}]
        </div>
        <div className={classes.status}>
          <div>
            {context.convertValue}
            {context.convertType === 'bpm' ? 'BPM' : 'x'}
          </div>
          <div>{status}</div>
        </div>
        <div className={classes.progressContainer}>
          <StyledLinearProgress
            className={clsx(
              classes.progress,
              status === 'canceled' && classes.canceled,
              status === 'error' && classes.error,
              status === 'done' && classes.done
            )}
            variant={'determinate'}
            value={
              status === 'canceled' || status === 'error' || status === 'done'
                ? 100
                : progress
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
    </HtmlTooltip>
  );
};
