import clsx from 'clsx';
import path from 'path';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
  ListRowRenderer,
} from 'react-virtualized';

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import {
  selectSelectedDiff,
  selectSelectedSet,
  setSelectedDiff,
  setSelectedSet,
} from '../../shared/BeatmapSetsList';
import { selectSongsFolder } from '../../shared/selectors/OsuFolder';
import TaskManager from '../../shared/TaskManager';
import BeatmapView from './Beatmap';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  margin: {
    margin: 10,
    marginTop: 5,
  },
  container: {
    flex: '1 1 auto',
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    padding: 5,

    '& .ReactVirtualized__List': {
      '&::-webkit-scrollbar': {
        width: 12,
        height: 12,
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.dark,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
  text: {
    padding: 5,
    textAlign: 'start',
    flex: 1,
  },
  displayFlex: {
    display: 'flex',
  },
  paper: {
    flex: 1,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  light: {
    backgroundColor: theme.palette.primary.light,
  },
  dark: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const RightBlock: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const osuSongsFolder = useSelector(selectSongsFolder);
  const selectedBeatmapSet = useSelector(selectSelectedSet);
  const selectedDiff = useSelector(selectSelectedDiff);
  const diffs = selectedBeatmapSet?.difficulties || [];

  const selectedFolderPath =
    selectedBeatmapSet &&
    path.join(osuSongsFolder, selectedBeatmapSet.folderName);

  React.useEffect(() => {
    console.log(selectedFolderPath, selectedDiff);
  }, [selectedFolderPath, selectedDiff]);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  });

  const rowRenderer: ListRowRenderer = ({
    index, // Index of row
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
  }: // This must be passed through to the rendered row element.
  ListRowProps) => {
    const item = diffs[index];

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {() => (
          <div style={style}>
            <Paper
              className={clsx(classes.root, classes.margin)}
              elevation={2}
              onClick={() =>
                dispatch(
                  setSelectedDiff({
                    beatmapSet: selectedBeatmapSet?.folderName,
                    difficulty: item.metadata.Version,
                  })
                )
              }
            >
              <Typography
                variant={'body2'}
                color={'textPrimary'}
                className={classes.text}
              >
                {item.metadata.Version}
              </Typography>
            </Paper>
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        direction={'column'}
        justify={'space-between'}
        className={clsx(classes.displayFlex, classes.margin, classes.paper)}
      >
        <Grid item sm className={clsx(classes.displayFlex, classes.paper)}>
          <Paper className={classes.container}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowCount={diffs.length}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  deferredMeasurementCache={cache}
                  overscanRowCount={0}
                  containerStyle={{ margin: 3 }}
                />
              )}
            </AutoSizer>
          </Paper>
        </Grid>
        <Grid item sm className={clsx(classes.displayFlex, classes.paper)}>
          {selectedFolderPath && selectedDiff.difficulty ? (
            <BeatmapView
              beatmap={selectedDiff.difficulty}
              folderPath={selectedFolderPath}
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
      <TaskManager />
    </div>
  );
};

export default RightBlock;
