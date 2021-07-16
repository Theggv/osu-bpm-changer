import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import {
  selectFilteredCount,
  selectTotalCount,
} from '../../BeatmapSetsSearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    width: 150,
  },
}));

const BeatmapSetsFilterResults: React.FC = () => {
  const classes = useStyles();

  const filtered = useSelector(selectFilteredCount);
  const total = useSelector(selectTotalCount);

  return (
    <div className={classes.root}>
      {filtered} of {total}
    </div>
  );
};

export default BeatmapSetsFilterResults;
