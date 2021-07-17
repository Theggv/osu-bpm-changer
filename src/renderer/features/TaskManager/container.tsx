import clsx from 'clsx';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { makeStyles } from '@material-ui/core/styles';

import { ExpandableContainer } from '../../shared/containers/AbsoluteExpandable';
import DetailedContainer from './components/DetailedContainer';
import { TaskMin } from './components/TaskMin';

const useStyles = makeStyles((_theme) => ({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#0004',
  },
  border: {
    borderTopLeftRadius: 8,
  },
  expanded: {
    transition: 'backgroundColor 250ms',
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
  const [collapseState, setCollapseState] = React.useState<
    'default' | 'expanded' | 'onstart' | 'onend'
  >('default');

  const classes = useStyles();

  return (
    <ExpandableContainer
      className={classes.root}
      expandBy={200}
      onCollapseChange={setCollapseState}
    >
      <div
        className={clsx(
          classes.container,
          classes.border,
          collapseState === 'onstart' ||
            (collapseState === 'expanded' && classes.expanded)
        )}
      >
        <DetailedContainer isCollapsed={collapseState === 'expanded'} />
        <CSSTransition
          in={collapseState === 'default'}
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
