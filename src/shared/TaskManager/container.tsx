import clsx from 'clsx';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { makeStyles } from '@material-ui/core/styles';

import { ExpandableContainer } from '../containers/AbsoluteExpandable';
import DetailedContainer from './components/DetailedContainer';
import { TaskMin } from './components/TaskMin';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.dark,
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

export const TaskManager = () => {
  const [isCollapsed, setCollapsed] = React.useState(false);

  const classes = useStyles();

  return (
    <ExpandableContainer
      className={classes.root}
      expandBy={200}
      onCollapseChange={setCollapsed}
    >
      <div className={clsx(classes.container, isCollapsed && classes.border)}>
        <DetailedContainer isCollapsed={isCollapsed} />
        <CSSTransition
          in={!isCollapsed}
          timeout={250}
          mountOnEnter
          unmountOnExit
          classNames={'task-min'}
        >
          <div className={classes.minContainer}>
            <div className={classes.tasksContainer}>
              <TaskMin />
            </div>
          </div>
        </CSSTransition>
      </div>
    </ExpandableContainer>
  );
};
