import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { ExpandableContainer } from '../../shared/containers/AbsoluteExpandable';
import { Task } from './components/Task';
import { CSSTransition } from 'react-transition-group';

import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    maxHeight: 50,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.dark,
    padding: 5,
  },
  border: {
    borderTopLeftRadius: 8,
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
        {isCollapsed ? (
          <Fade appear={false} in={isCollapsed} timeout={1000}>
            <div>detailed</div>
          </Fade>
        ) : (
          <Fade appear={false} in={!isCollapsed} timeout={1000}>
            <Task />
          </Fade>
        )}
      </div>
    </ExpandableContainer>
  );
};
