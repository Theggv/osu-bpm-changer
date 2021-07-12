import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((_theme) => ({
  root: { display: 'flex' },
}));

interface TaskProps {}

export const Task: React.FC<TaskProps> = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      Kobaryo - Bookmaker [Corrupt The World] 
	  200BPM
      <LinearProgress variant={'determinate'} value={50} color={'secondary'} />
    </Card>
  );
};
