import React from 'react';

import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontWeight: 600,
    marginRight: 15,
  },
  switchBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    fontSize: 14,
    marginLeft: 10,
  },
  selected: {
    fontWeight: 600,
  },
});

const AntSwitch = withStyles((theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

interface TypeSwitcherProps {
  checked: boolean;
  onChange: (event: any, checked: boolean) => void;
}

const TypeSwitcher: React.FC<TypeSwitcherProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Convert type</div>
      <div className={classes.switchBlock}>
        <div className={clsx(classes.item, !props.checked && classes.selected)}>
          Multiplier
        </div>
        <div className={classes.item}>
          <AntSwitch {...props} />
        </div>
        <div className={clsx(classes.item, props.checked && classes.selected)}>
          BPM
        </div>
      </div>
    </div>
  );
};

export default TypeSwitcher;
