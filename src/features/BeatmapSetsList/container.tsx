import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
  ListRowRenderer,
} from 'react-virtualized';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import SongFolder from './components/SongFolder';
import { BeatmapSetFolder } from '../../shared/Osu/BeatmapSet';

import { selectOsuFolder } from '../../shared/selectors/OsuFolder';
import {
  selectBeatmapSetsSorted,
  selectIsLoading,
  selectSelectedItemId,
  loadSongsList,
  setSelectedItem,
} from './ducks';
import {
  selectSearchString,
  setSearchResults,
} from '../../shared/BeatmapSetsSearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: '1 1 auto',
    backgroundColor: theme.palette.primary.main,
    margin: 10,

    '& .ReactVirtualized__List': {
      '&::-webkit-scrollbar': {
        width: 12,
        height: 12,
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.light,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const BeatmapSetsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const osuFolder = useSelector(selectOsuFolder);
  const filter = useSelector(selectSearchString);

  const songs = useSelector(selectBeatmapSetsSorted);
  const isLoading = useSelector(selectIsLoading);
  const selectedItem = useSelector(selectSelectedItemId);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  });

  const filteredSong = React.useMemo(() => {
    cache.clearAll();

    return songs.filter((song) =>
      song.folderName.toLowerCase().includes(filter)
    );
  }, [songs, filter]);

  React.useEffect(() => {
    if (!osuFolder) return;

    cache.clearAll();

    dispatch(loadSongsList());
  }, [osuFolder]);

  React.useEffect(() => {
    dispatch(
      setSearchResults({
        filteredCount: filteredSong.length,
        totalCount: songs.length,
      })
    );
  }, [filteredSong.length, songs.length]);

  const onItemClick = (item: BeatmapSetFolder) => {
    dispatch(setSelectedItem(item.folderName));
  };

  const noRowsRenderer = React.useCallback(() => {
    if (isLoading)
      return (
        <Container>
          <CircularProgress />
        </Container>
      );

    return <></>;
  }, [isLoading]);

  const rowRenderer: ListRowRenderer = ({
    index, // Index of row
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
  }: // This must be passed through to the rendered row element.
  ListRowProps) => {
    const item = filteredSong[index];

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
            <SongFolder
              beatmapSetFolder={item}
              onClick={() => onItemClick(item)}
              isSelected={selectedItem === item.folderName}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={0}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={filteredSong.length}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              noRowsRenderer={noRowsRenderer}
              deferredMeasurementCache={cache}
              overscanRowCount={30}
              containerStyle={{ margin: 3 }}
            />
          )}
        </AutoSizer>
      </Paper>
    </div>
  );
};

export default BeatmapSetsList;
