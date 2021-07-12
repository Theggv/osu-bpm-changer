import { RootState } from '../../../app/rootState';
import { BeatmapSetsListState } from './types';
import { createSelector } from 'reselect';

const select = (state: RootState): BeatmapSetsListState =>
  state.beatmapSetsListState;

export const selectBeatmapSets = createSelector(
  select,
  (state) => state.beatmapSets
);

export const selectIsLoading = (state: RootState) => select(state).isLoading;

export const selectSelectedItemId = (state: RootState) =>
  select(state).selectedItem;

export const selectSelectedItem = (state: RootState) => {
  const selectedItem = select(state).selectedItem;

  return select(state).beatmapSets.find(
    (value) => value.folderName === selectedItem
  );
};

export const selectBeatmapSetsSorted = createSelector(
  selectBeatmapSets,
  (state) => {
    const copy = [...state];

    return copy.sort((a, b) => {
      return (a.parsed.artist || a.folderName).localeCompare(
        b.parsed.artist || b.folderName
      );
    });
  }
);
