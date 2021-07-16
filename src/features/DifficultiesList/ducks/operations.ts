import {
  SetFolderAction,
  SetLoadingAction,
  SetValidAction,
  ActionTypes,
} from './actions';

export const setFolder = (
  payload: SetFolderAction['payload']
): SetFolderAction => ({
  type: ActionTypes.SET_FOLDER,
  payload,
});

export const setLoading = (
  payload: SetLoadingAction['payload']
): SetLoadingAction => ({
  type: ActionTypes.SET_LOADING,
  payload,
});

export const setValid = (
  payload: SetValidAction['payload']
): SetValidAction => ({
  type: ActionTypes.SET_VALID,
  payload,
});
