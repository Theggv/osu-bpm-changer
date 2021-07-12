import produce, { Draft } from 'immer';
import { Actions, ActionTypes } from './actions';
import { BeatmapSetsListState } from './types';

const initialState: BeatmapSetsListState = {
  beatmapSets: [],
  isLoading: false,
};

export const reducer = produce(
  (draft: Draft<BeatmapSetsListState>, action: Actions) => {
    switch (action.type) {
      case ActionTypes.LOAD_SONGS_LIST:
        break;

      case ActionTypes.SET_SONGS_LIST:
        draft.beatmapSets = action.payload;
        break;

      case ActionTypes.SET_LOADING:
        draft.isLoading = action.payload;
        break;

      case ActionTypes.SET_SELECTED:
        draft.selectedItem = action.payload;
        break;

      case ActionTypes.LOAD_DIFFS:
        break;

      case ActionTypes.SET_DIFFS:
        draft.beatmapSets.forEach((value, index) => {
          if (value.folderName !== action.payload.id) return;

          draft.beatmapSets[index].difficulties = action.payload.diffs;
        });
        break;

      default:
        break;
    }
  },
  initialState
);
