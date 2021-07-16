import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CellMeasurerCache } from 'react-virtualized';

import { selectSearchString, setSearchResults } from '../BeatmapSetsSearchBar';
import AnimatedList from '../containers/AnimatedList';
import { selectOsuFolder } from '../selectors/OsuFolder';
import BeatmapView, { BeatmapViewProps } from './components/BeatmapView';
import {
  loadSongsList,
  selectBeatmapSetsSorted,
  selectSelectedDiff,
  selectSelectedSet,
  setSelectedDiff,
  setSelectedSet,
} from './ducks';

type Difficulty = BeatmapViewProps['content'] & {
  isSelectedSet: boolean;
};

const BeatmapSetsList: React.FC = () => {
  const dispatch = useDispatch();

  const osuFolder = useSelector(selectOsuFolder);
  const filter = useSelector(selectSearchString);

  const songs = useSelector(selectBeatmapSetsSorted);
  const selectedSet = useSelector(selectSelectedSet);
  const selectedDiff = useSelector(selectSelectedDiff);

  const [scrollToRow, setScrollToRow] = useState<number | undefined>(undefined);

  const [shouldUpdateScroll, setShouldUpdateScroll] = React.useState(false);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    fixedHeight: true,
    defaultHeight: 85,
  });

  const filteredSong = React.useMemo(() => {
    cache.clearAll();

    return songs.filter((song) =>
      song.folderName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [songs, filter]);

  const songsWithDiffs = React.useMemo(() => {
    return songs
      .filter((song) =>
        song.folderName.toLowerCase().includes(filter.toLowerCase())
      )
      .flatMap((song) => {
        if (song.folderName === selectedSet?.folderName) {
          return song.difficulties.map(
            (diff) =>
              ({
                beatmapSet: song,
                difficulty: diff,
                isSelectedSet: true,
              } as Difficulty)
          );
        } else
          return {
            beatmapSet: song,
            isSelectedSet: selectedSet?.folderName === song.folderName,
          } as Difficulty;
      }, 1);
  }, [filteredSong, selectedSet]);

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

  React.useEffect(() => {
    setShouldUpdateScroll(
      selectedSet?.folderName === selectedDiff.beatmapSet?.folderName
    );
  }, [selectedSet, selectedDiff]);

  React.useEffect(() => {
    if (!shouldUpdateScroll) return;

    songsWithDiffs
      .map((value, index) => ({ value, index }))
      .filter(
        (x) =>
          x.value.isSelectedSet &&
          x.value.difficulty?.metadata.Version ===
            selectedDiff.difficulty?.metadata.Version
      )
      .forEach((x) => {
        setScrollToRow(x.index);
        // const scrollPos = (x.index - 2) * cache.defaultHeight;
        // listRef.current?.scrollToPosition(scrollPos < 0 ? 0 : scrollPos);
      });
  }, [shouldUpdateScroll]);

  const onItemClick = (item: Difficulty) => {
    if (item.beatmapSet.folderName !== selectedSet?.folderName)
      dispatch(setSelectedSet(item.beatmapSet.folderName));
    else if (item.difficulty)
      dispatch(
        setSelectedDiff({
          beatmapSet: item.beatmapSet.folderName,
          difficulty: item.difficulty.metadata.Version,
        })
      );
  };

  const rowRenderer = (item: Difficulty) => (
    <BeatmapView
      content={{ ...item }}
      onClick={() => onItemClick(item)}
      isSelectedSet={item.isSelectedSet}
      isSelectedDiff={
        item.difficulty?.metadata.Version ===
        selectedDiff.difficulty?.metadata.Version
      }
    />
  );

  return (
    <AnimatedList
      cache={cache}
      items={songsWithDiffs}
      renderer={rowRenderer}
      options={{ scrollToRow }}
    />
  );
};

export default BeatmapSetsList;
