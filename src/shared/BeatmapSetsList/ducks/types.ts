import { Beatmap, BeatmapSetFolder } from '../../Osu';

export interface BeatmapSet extends BeatmapSetFolder {
  difficulties: Beatmap[];
}

export interface BeatmapSetsListState {
  beatmapSets: BeatmapSet[];
  isLoading: boolean;
  selectedSet?: BeatmapSet['folderName'];
  selectedDiff: {
    beatmapSet?: BeatmapSet['folderName'];
    difficulty?: Beatmap['metadata']['Version'];
  };
}
