import { OsuFolderState } from '../features/OsuFolder';
import { TaskManagerState } from '../features/TaskManager';
import { BeatmapSetsListState } from '../shared/BeatmapSetsList';
import { FilterState } from '../shared/BeatmapSetsSearchBar';

export interface RootState {
  osuFolderState: OsuFolderState;
  beatmapSetsListState: BeatmapSetsListState;
  beatmapSetsFilterState: FilterState;
  taskManagerState: TaskManagerState;
}
