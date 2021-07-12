import { combineReducers } from 'redux';
import { BeatmapSetsListReducer } from '../features/BeatmapSetsList';
import { BeatmapSetsSearchBarReducer } from '../shared/BeatmapSetsSearchBar';
import { OsuFolderReducer } from '../features/OsuFolder';

import { RootState } from './rootState';

export const rootReducer = combineReducers<RootState>({
  osuFolderState: OsuFolderReducer,
  beatmapSetsListState: BeatmapSetsListReducer,
  beatmapSetsFilterState: BeatmapSetsSearchBarReducer,
});
