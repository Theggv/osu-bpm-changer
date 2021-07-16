import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  CellMeasurerCache,
  List,
  ListRowProps,
  ListRowRenderer,
  ScrollParams,
} from 'react-virtualized';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: '1 1 auto',
    backgroundColor: 'transparent',
    margin: 10,

    '& .ReactVirtualized__List': {
      '&::-webkit-scrollbar': {
        width: 12,
        height: 12,
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: 20,
        backgroundColor: '#0004',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 20,
        backgroundColor: '#fff',
      },
    },
  },
}));

const easeOut = (delta: number) => {
  return 1 - Math.pow(1 - delta, 1.675);
};

interface CacheableListProps<T = any> {
  cache: CellMeasurerCache;
  items: T[];
  renderer: (item: T) => React.ReactNode;
  options?: {
    scrollToRow?: number;
  };
}

const AnimatedList = <T,>({
  cache,
  items,
  renderer,
  options,
}: PropsWithChildren<CacheableListProps<T>>) => {
  const classes = useStyles();

  const listRef = useRef<List>(null);

  const [animationStartTime, setAnimationStartTime] = useState(0);
  const [scrollTopInitial, setScrollTopInitial] = useState(0);
  const [scrollTopFinal, setScrollTopFinal] = useState(0);

  const playAnimation = ({
    timingFunction,
    draw,
    duration,
    onAninationEnd,
  }: {
    timingFunction: (timeFraction: number) => number;
    draw: (progress: number) => void;
    duration: number;
    onAninationEnd: () => void;
  }) => {
    const start = performance.now();

    return requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = timingFunction(timeFraction);

      // отрисовать её
      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        onAninationEnd();
      }
    });
  };

  const initAnimation = () => {
    if (animationStartTime) {
      // throw Error('Animation in progress');
      return;
    }

    if (!listRef.current || !options?.scrollToRow) return;

    setScrollTopFinal((options.scrollToRow - 2.5) * cache.defaultHeight);

    setAnimationStartTime(performance.now());
  };

  const onScroll = (ev: ScrollParams) => {
    if (!animationStartTime) {
      setScrollTopInitial(ev.scrollTop);
    }
  };

  const rowRenderer: ListRowRenderer = ({
    index,
    key,
    style,
  }: ListRowProps) => {
    const item = items[index];

    return <div {...{ style, key }}>{renderer(item)}</div>;
  };

  useEffect(() => {
    if (options?.scrollToRow) initAnimation();
  }, [options?.scrollToRow]);

  useEffect(() => {
    if (animationStartTime)
      playAnimation({
        duration: 350,
        timingFunction: easeOut,
        draw: (progress) => {
          const scrollDelta = scrollTopFinal - scrollTopInitial;

          listRef.current?.scrollToPosition(
            scrollTopInitial + scrollDelta * progress
          );
        },
        onAninationEnd: () => {
          setAnimationStartTime(0);
          setScrollTopInitial(scrollTopFinal);
        },
      });
  }, [animationStartTime]);

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={0}>
        <AutoSizer>
          {(size) => {
            return (
              <List
                {...size}
                ref={listRef}
                rowCount={items.length}
                rowHeight={cache.defaultHeight}
                rowRenderer={rowRenderer}
                overscanRowCount={3}
                containerStyle={{ margin: 3 }}
                onScroll={onScroll}
              />
            );
          }}
        </AutoSizer>
      </Paper>
    </div>
  );
};

export default AnimatedList;
