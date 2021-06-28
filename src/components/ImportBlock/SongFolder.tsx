import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import clsx from 'clsx';
import { BeatmapSetFolder } from '../../models/BeatmapSet';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 4,
    color: theme.palette.text.primary,
    backgroundColor: `${theme.palette.primary.dark}44`,
    display: 'flex',
    cursor: 'pointer',
    borderRadius: '8px 0 0 8px',
    transition:
      'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',

    '&:hover': {
      color: theme.palette.text.secondary,
      backgroundColor: `${theme.palette.primary.dark}88`,
      transform: 'translate(8px)',
    },
  },
  text: {
    padding: 5,
    textAlign: 'start',
    flex: 1,
    color: 'inherit',
  },
  flex: {
    flex: 1,
  },
  selected: {
    color: theme.palette.text.secondary,
    backgroundColor: `${theme.palette.primary.dark}bb`,

    '&:hover': {
      transform: 'translate(8px)',
      color: theme.palette.text.secondary,
      backgroundColor: `${theme.palette.primary.dark}bb`,
    },
  },
  diff: {
    marginLeft: 10,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
}));

export interface SongFolderProps {
  beatmapSetFolder: BeatmapSetFolder;
  onClick: () => void;
  isSelected: boolean;
}

const SongFolder: React.FC<SongFolderProps> = ({
  beatmapSetFolder,
  onClick,
  isSelected,
}) => {
  const classes = useStyles();

  const onClickHandler = () => {
    onClick();
  };

  return (
    <div className={classes.container}>
      <Paper
        className={clsx(classes.root, isSelected && classes.selected)}
        elevation={2}
        onClick={onClickHandler}
      >
        {beatmapSetFolder.beatmapId ? (
          <Typography
            variant={'body2'}
            color={'textPrimary'}
            className={classes.text}
          >
            {beatmapSetFolder.artist} - {beatmapSetFolder.title}
          </Typography>
        ) : (
          <Typography
            variant={'body2'}
            color={'textPrimary'}
            className={classes.text}
          >
            {beatmapSetFolder.folderName}
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default SongFolder;
