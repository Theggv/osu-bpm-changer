import '../styles.css';

import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { CellMeasurerCache } from 'react-virtualized';

import { makeStyles } from '@material-ui/core/styles';

import CacheableListWithColumns from '../../../shared/containers/CacheableListWithColumns';
import { selectTasks } from '../ducks';
import { TaskDetailed } from './TaskDetailed';

const useStyles = makeStyles((_theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    width: 275,
    height: 100,
  },
  border: {
    borderTopLeftRadius: 8,
  },
  tasksContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  minContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 2,
  },
  detailed: {
    margin: 5,
  },
}));

interface DetailedContainerProps {
  isCollapsed: boolean;
}

const DetailedContainer: React.FC<DetailedContainerProps> = ({
  isCollapsed,
}) => {
  const classes = useStyles();

  const tasks = useSelector(selectTasks);

  const cache = new CellMeasurerCache({
    defaultWidth: 275,
    defaultHeight: 100,
    fixedWidth: true,
    fixedHeight: true,
  });

  return (
    <CSSTransition
      in={isCollapsed}
      timeout={250}
      mountOnEnter
      unmountOnExit
      classNames={'task-detailed'}
    >
      <div className={clsx(classes.root)}>
        <CacheableListWithColumns
          items={tasks}
          cache={cache}
          renderer={(item) => {
            return (
              <div className={classes.container} key={item.taskId}>
                <TaskDetailed taskState={item} />
              </div>
            );
          }}
        />
      </div>
    </CSSTransition>
  );
};

export default DetailedContainer;
