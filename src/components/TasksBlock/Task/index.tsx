import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TaskView = () => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

export default TaskView;
