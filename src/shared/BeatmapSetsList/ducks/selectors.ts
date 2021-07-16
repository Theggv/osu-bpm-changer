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

export const selectSelectedSet = createSelector(
  select,
  selectBeatmapSets,
  (state, beatmapSets) =>
    beatmapSets.find((value) => value.folderName === state.selectedSet)
);

export const selectSelectedDiff = createSelector(
  select,
  selectBeatmapSets,
  (state, beatmapSets) => {
    const beatmapSet = beatmapSets.find(
      (value) => value.folderName === state.selectedDiff.beatmapSet
    );

    return {
      beatmapSet,
      difficulty: beatmapSet?.difficulties.find(
        (value) => value.metadata.Version === state.selectedDiff.difficulty
      ),
    };
  }
);

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
