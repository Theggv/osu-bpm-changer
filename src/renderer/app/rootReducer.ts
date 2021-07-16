import { combineReducers } from 'redux';

import { OsuFolderReducer } from '../features/OsuFolder';
import { BeatmapSetsListReducer } from '../shared/BeatmapSetsList';
import { BeatmapSetsSearchBarReducer } from '../shared/BeatmapSetsSearchBar';
import { TaskManagerReducer } from '../shared/TaskManager';
import { RootState } from './rootState';

export const rootReducer = combineReducers<RootState>({
  osuFolderState: OsuFolderReducer,
  beatmapSetsListState: BeatmapSetsListReducer,
  beatmapSetsFilterState: BeatmapSetsSearchBarReducer,
  taskManagerState: TaskManagerReducer,
});
