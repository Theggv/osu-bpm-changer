import {
  ActionTypes,
  LoadSongsListAction,
  SetLoadingAction,
  SetSelectedAction,
  SetSongsListAction,
  SetDiffsAction,
  LoadDiffsAction,
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

export const setSelectedItem = (
  payload: SetSelectedAction['payload']
): SetSelectedAction => ({
  type: ActionTypes.SET_SELECTED,
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
