import { Action } from 'redux';
import { BeatmapSet, BeatmapSetsListState } from './types';

// Action Types enum

export enum ActionTypes {
  LOAD_SONGS_LIST = 'BeatmapSetsList/LOAD_SONGS_LIST',
  SET_SONGS_LIST = 'BeatmapSetsList/SET_SONGS_LIST',

  SET_LOADING = 'BeatmapSetsList/SET_LOADING',
  SET_SELECTED = 'BeatmapSetsList/SET_SELECTED',

  LOAD_DIFFS = 'BeatmapSetsList/LOAD_DIFFS',
  SET_DIFFS = 'BeatmapSetsList/SET_DIFFS',
}

// Action interfaces

export interface LoadSongsListAction extends Action<ActionTypes> {
  type: ActionTypes.LOAD_SONGS_LIST;
}

export interface SetSongsListAction extends Action<ActionTypes> {
  type: ActionTypes.SET_SONGS_LIST;
  payload: BeatmapSetsListState['beatmapSets'];
}

export interface SetLoadingAction extends Action<ActionTypes> {
  type: ActionTypes.SET_LOADING;
  payload: BeatmapSetsListState['isLoading'];
}

export interface SetSelectedAction extends Action<ActionTypes> {
  type: ActionTypes.SET_SELECTED;
  payload: BeatmapSetsListState['selectedItem'];
}

export interface SetDiffsAction extends Action<ActionTypes> {
  type: ActionTypes.SET_DIFFS;
  payload: { id: BeatmapSet['folderName']; diffs: BeatmapSet['difficulties'] };
}

export interface LoadDiffsAction extends Action<ActionTypes> {
  type: ActionTypes.LOAD_DIFFS;
}

// Action type

export type Actions =
  | LoadSongsListAction
  | SetSongsListAction
  | SetLoadingAction
  | SetSelectedAction
  | SetDiffsAction
  | LoadDiffsAction;
