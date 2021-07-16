import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import BeatmapSetsList from '../../shared/BeatmapSetsList';

const useStyles = makeStyles((_theme) => ({
  container: {
    flex: 1,
    display: 'flex',
  },
}));

const DifficultiesList: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <BeatmapSetsList />
    </div>
  );
};

export default DifficultiesList;
