import { RootState } from '../../../app/rootState';
import { FilterState } from './types';

const select = (state: RootState): FilterState => state.beatmapSetsFilterState;

export const selectSearchString = (state: RootState) =>
  select(state).searchString;

export const selectFilteredCount = (state: RootState) =>
  select(state).filteredCount;

export const selectTotalCount = (state: RootState) => select(state).totalCount;
