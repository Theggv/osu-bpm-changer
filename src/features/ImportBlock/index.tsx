import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import clsx from 'clsx';
import OsuFolder from '../../features/OsuFolder';
import BeatmapSetsList from '../../features/BeatmapSetsList';
import BeatmapSetsFilterResults from '../../shared/components/BeatmapSetsFilterResults';
import BeatmapSetsSearchBar from '../../shared/BeatmapSetsSearchBar';

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
