import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.dark,
    alignItems: 'center',
    paddingRight: 15,
    minHeight: 50,
  },
}));

interface BottomBarProps {
  filtered: number;
  total: number;
}

const BottomBar: React.FC<BottomBarProps> = ({ filtered, total }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {filtered} of {total}
    </div>
  );
};

export default BottomBar;
