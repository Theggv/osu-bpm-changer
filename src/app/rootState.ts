import { BeatmapSetsListState } from '../features/BeatmapSetsList';
import { FilterState } from '../shared/BeatmapSetsSearchBar';
import { OsuFolderState } from '../features/OsuFolder';

export interface RootState {
  osuFolderState: OsuFolderState;
  beatmapSetsListState: BeatmapSetsListState;
  beatmapSetsFilterState: FilterState;
}
