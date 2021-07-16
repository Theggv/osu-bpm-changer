import { OsuFolderState } from '../features/OsuFolder';
import { BeatmapSetsListState } from '../shared/BeatmapSetsList';
import { FilterState } from '../shared/BeatmapSetsSearchBar';
import { TaskManagerState } from '../shared/TaskManager';

export interface RootState {
  osuFolderState: OsuFolderState;
  beatmapSetsListState: BeatmapSetsListState;
  beatmapSetsFilterState: FilterState;
  taskManagerState: TaskManagerState;
}
