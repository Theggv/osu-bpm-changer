import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFilteredCount,
  selectTotalCount,
} from '../../BeatmapSetsSearchBar';

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
