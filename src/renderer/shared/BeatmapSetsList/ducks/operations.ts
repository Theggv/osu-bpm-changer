import {
  ActionTypes,
  LoadDiffsAction,
  LoadSongsListAction,
  SetDiffsAction,
  SetLoadingAction,
  SetSelectedSetAction,
  SetSelectedDiffAction,
  SetSongsListAction,
} from './actions';

export const loadSongsList = (): LoadSongsListAction => ({
  type: ActionTypes.LOAD_SONGS_LIST,
});

export const setSongsList = (
  payload: SetSongsListAction['payload']
): SetSongsListAction => ({
  type: ActionTypes.SET_SONGS_LIST,
  payload,
});

export const setLoading = (
  payload: SetLoadingAction['payload']
): SetLoadingAction => ({
  type: ActionTypes.SET_LOADING,
  payload,
});

export const setSelectedSet = (
  payload: SetSelectedSetAction['payload']
): SetSelectedSetAction => ({
  type: ActionTypes.SET_SELECTEDSET,
  payload,
});

export const setSelectedDiff = (
  payload: SetSelectedDiffAction['payload']
): SetSelectedDiffAction => ({
  type: ActionTypes.SET_SELECTEDDIFF,
  payload,
});

export const loadDiffs = (): LoadDiffsAction => ({
  type: ActionTypes.LOAD_DIFFS,
});

export const setDiffs = (
  payload: SetDiffsAction['payload']
): SetDiffsAction => ({
  type: ActionTypes.SET_DIFFS,
  payload,
});
