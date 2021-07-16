import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import BeatmapSetsList from '../../shared/BeatmapSetsList';
import BackgroundContainer from './components/BackgroundContainer';

const useStyles = makeStyles((_theme) => ({
  container: {
    flex: 1,
    display: 'flex',
  },
}));

const DifficultiesList: React.FC = () => {
  const classes = useStyles();

  return (
    <BackgroundContainer>
      <div className={classes.container}>
        <BeatmapSetsList />
      </div>
    </BackgroundContainer>
  );
};

export default DifficultiesList;
