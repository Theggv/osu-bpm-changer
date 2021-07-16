import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { selectSelectedDiff, selectSelectedSet } from '../../BeatmapSetsList';
import { useOsuBackground } from '../../utils/hooks/useOsuBackground';

const useStyles = makeStyles((_theme) => ({
  root: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    position: 'relative',
  },
  img: {
    pointerEvents: 'none',
    position: 'absolute',
    width: 'calc(100% + 16px)',
    height: 'calc(100% + 16px)',
    objectFit: 'cover',
    zIndex: 0,
    filter: 'brightness(50%)',
    transition: 'all 750ms ease-out',
  },
  container: {
    flex: 1,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loading: {
    filter: 'brightness(35%)',
    transition: 'all 750ms ease-out',
  },
}));

const BackgroundContainer: React.FC = ({ children }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const selectedSet = useSelector(selectSelectedSet);
  const selectedDiff = useSelector(selectSelectedDiff);

  const background = useOsuBackground(
    selectedDiff.difficulty,
    selectedDiff.beatmapSet?.folderName
  );

  useEffect(() => {
    if (selectedSet) setLoading(true);
  }, [selectedSet]);

  useEffect(() => {
    if (
      selectedDiff.beatmapSet?.folderName === selectedSet?.folderName &&
      selectedDiff.difficulty
    )
      setLoading(false);
  }, [selectedDiff]);

  useEffect(() => {
    const onMouseMove = (ev: MouseEvent) => {
      if (!imgRef.current) return;

      const width = document.body.clientWidth;
      const height = document.body.clientHeight;

      const x = ((ev.clientX - width / 2) / width) * 16;
      const y = ((ev.clientY - height / 2) / height) * 16;

      imgRef.current.style.top = `${-y - 8}px`;
      imgRef.current.style.bottom = `${y - 8}px`;
      imgRef.current.style.left = `${-x - 8}px`;
      imgRef.current.style.right = `${x - 8}px`;
    };

    document.body.addEventListener('mousemove', onMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={classes.root}>
      <img
        ref={imgRef}
        className={clsx(classes.img, loading && classes.loading)}
        src={background.currentUrl}
      />
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default BackgroundContainer;
