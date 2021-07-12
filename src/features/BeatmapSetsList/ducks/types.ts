import { Beatmap, BeatmapSetFolder } from '../../../shared/Osu';

export interface BeatmapSet extends BeatmapSetFolder {
  difficulties: Beatmap[];
  selectedItem?: Beatmap['metadata']['Version'];
}

export interface BeatmapSetsListState {
  beatmapSets: BeatmapSet[];
  isLoading: boolean;
  selectedItem?: BeatmapSet['folderName'];
}
