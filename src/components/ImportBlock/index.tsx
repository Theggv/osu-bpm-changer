import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import TopBar from './TopBar';
import SearchBar from './SearchBar';
import SongsFolderList from './SongsFolderList';
import { BeatmapSetFolder } from '../../models/BeatmapSet';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
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

interface ImportBlockProps {
  onFolderSelected: (folder: BeatmapSetFolder) => void;
}

const ImportBlock: React.FC<ImportBlockProps> = ({ onFolderSelected }) => {
  const classes = useStyles();

  const [osuSongsFolder, setOsuSongsFolder] = React.useState<string>('');
  const [filter, setFilter] = React.useState('');

  return (
    <div className={classes.root}>
      <div className={clsx(classes.container, classes.top)}>
        <TopBar onPathFound={(path) => setOsuSongsFolder(path)} />
        <SearchBar onQueryChanged={(text) => setFilter(text)} />
      </div>
      <div className={clsx(classes.container, classes.flex, classes.bottom)}>
        <SongsFolderList
          osuSongsFolder={osuSongsFolder}
          filter={filter}
          onFolderSelected={onFolderSelected}
        />
      </div>
    </div>
  );
};

export default ImportBlock;
