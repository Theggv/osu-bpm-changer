import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Beatmap } from '../../Osu';
import { useOsuBackground } from '../../utils/hooks/useOsuBackground';
import { BeatmapSet } from '../ducks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 85,
    marginLeft: '30%',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    position: 'relative',

    transition: 'transform 0.75s cubic-bezier(.2,.76,.34,.94)',

    '&:hover': {
      transform: 'translateX(-60px)',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '10%',
    },
  },
  rootSelectedSet: {
    transform: 'translateX(-90px)',

    '&:hover': {
      transform: 'translateX(-125px)',
    },
  },
  rootSelectedDiff: {
    transform: 'translateX(-100px)',

    '&:hover': {
      transform: 'translateX(-125px)',
    },
  },
  container: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 125,
    right: -125,

    display: 'flex',

    borderRadius: '8px 0 0 8px',
    overflow: 'hidden',
  },
  preview: {
    width: 100,
    height: '100%',
    position: 'relative',
  },
  beatmapBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    color: `${theme.palette.text.secondary}d`,
    paddingLeft: 16,
    backgroundColor: '#00001070',
    fontWeight: 700,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  artist: {
    fontSize: 14,
    display: 'flex',
    itemsAlign: 'center',
    marginBottom: 3,
  },
  difficulty: {
    fontSize: 14,
    marginBottom: 2,
  },
  img: {
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.4,
  },
  imgSelected: {
    opacity: 1,
  },
  beatmapBlockSelected: {
    backgroundColor: '#00001090',
  },
  selectedSet: {
    opacity: 0.5,
  },
}));

export interface BeatmapViewProps {
  content: {
    beatmapSet: BeatmapSet;
    difficulty?: Beatmap;
  };
  onClick: () => void;
  isSelectedSet: boolean;
  isSelectedDiff: boolean;
}

const BeatmapView: React.FC<BeatmapViewProps> = ({
  content,
  onClick,
  isSelectedSet,
  isSelectedDiff,
}) => {
  const classes = useStyles();

  const background = useOsuBackground(
    content.difficulty
      ? content.difficulty
      : content.beatmapSet.difficulties[0],
    content.beatmapSet.folderName
  );

  return (
    <div
      className={clsx(
        classes.root,
        isSelectedSet && classes.rootSelectedSet,
        isSelectedDiff && classes.rootSelectedDiff
      )}
      onClick={onClick}
    >
      <div className={classes.container}>
        <div className={classes.preview}>
          <img
            className={clsx(classes.img, isSelectedSet && classes.imgSelected)}
            src={background.currentUrl}
          />
        </div>
        <div
          className={clsx(
            classes.beatmapBlock,
            isSelectedSet && classes.beatmapBlockSelected
          )}
        >
          <div
            className={clsx(
              classes.title,
              isSelectedSet && !isSelectedDiff && classes.selectedSet
            )}
          >
            {content.beatmapSet.parsed.title
              ? content.beatmapSet.parsed.title
              : content.beatmapSet.folderName}
          </div>
          <div
            className={clsx(
              classes.artist,
              isSelectedSet && !isSelectedDiff && classes.selectedSet
            )}
          >
            <div>{content.beatmapSet.parsed.artist} </div>
            {content.difficulty && (
              <>
                <div style={{ paddingLeft: 5, paddingRight: 5 }}>//</div>
                <div>{content.difficulty.metadata.Creator}</div>
              </>
            )}
          </div>
          {content.difficulty && (
            <div>{content.difficulty.metadata.Version}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeatmapView;
