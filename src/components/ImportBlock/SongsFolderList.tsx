import React from 'react';
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

import { readSongsFolder } from '../../models/OsuUtils';
import BottomBar from './BottomBar';
import SongFolder from './SongFolder';
import { BeatmapSetFolder } from '../../models/BeatmapSet';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: '1 1 auto',
    backgroundColor: theme.palette.primary.light,
    margin: 10,

    '& .ReactVirtualized__List': {
      '&::-webkit-scrollbar': {
        width: 12,
        height: 12,
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

interface SongsFolderListProps {
  filter: string;
  osuSongsFolder?: string;
  onFolderSelected: (folder: BeatmapSetFolder) => void;
}

const SongsFolderList: React.FC<SongsFolderListProps> = ({
  osuSongsFolder,
  filter,
  onFolderSelected,
}) => {
  const classes = useStyles();

  const [songs, setSongs] = React.useState<BeatmapSetFolder[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [
    selectedItem,
    setSelectedItem,
  ] = React.useState<BeatmapSetFolder | null>(null);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  });

  const filteredSong = React.useMemo(() => {
    cache.clearAll();

    return songs
      .filter((song) => song.folderName.toLowerCase().includes(filter))
      .sort((a, b) => {
        return (a.artist || a.folderName).localeCompare(
          b.artist || b.folderName
        );
      });
  }, [songs, filter]);

  React.useEffect(() => {
    if (!osuSongsFolder) return;

    const wrapper = async () => {
      cache.clearAll();

      setIsLoading(true);
      setSongs([]);

      readSongsFolder(osuSongsFolder)
        .then((songs) => {
          setSongs(songs);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    wrapper();
  }, [osuSongsFolder]);

  React.useEffect(() => {
    if (selectedItem) onFolderSelected(selectedItem);
  }, [selectedItem]);

  const onItemClick = (item: BeatmapSetFolder) => {
    setSelectedItem(item);
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
              isSelected={selectedItem?.fullPath === item.fullPath}
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
      <BottomBar filtered={filteredSong.length} total={songs.length} />
    </div>
  );
};

export default SongsFolderList;
