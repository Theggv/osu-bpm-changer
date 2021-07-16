import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import OsuFolder from '../../features/OsuFolder';
import BeatmapSetsList from '../../shared/BeatmapSetsList';
import BeatmapSetsSearchBar from '../../shared/BeatmapSetsSearchBar';
import BeatmapSetsFilterResults from '../../shared/components/BeatmapSetsFilterResults';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  flex: {
    flex: 1,
  },
  top: {
    backgroundColor: theme.palette.primary.dark,
  },
  bottom: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ImportBlock: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, classes.flex)}>
      <div className={clsx(classes.container, classes.top)}>
        <OsuFolder />
        <BeatmapSetsSearchBar />
      </div>
      <div className={clsx(classes.container, classes.flex, classes.bottom)}>
        <BeatmapSetsList />
        <BeatmapSetsFilterResults />
      </div>
    </div>
  );
};

export default ImportBlock;
