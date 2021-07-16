import { Action } from 'redux';
import { OsuFolderState } from './types';

// Action Types enum

export enum ActionTypes {
  SET_FOLDER = 'TaskManager/SET_FOLDER',
  SET_LOADING = 'TaskManager/SET_LOADING',
  SET_VALID = 'TaskManager/SET_VALID',
}

// Action interfaces

export interface SetFolderAction extends Action<ActionTypes> {
  type: ActionTypes.SET_FOLDER;
  payload: OsuFolderState['folder'];
}

export interface SetLoadingAction extends Action<ActionTypes> {
  type: ActionTypes.SET_LOADING;
  payload: OsuFolderState['isLoading'];
}

export interface SetValidAction extends Action<ActionTypes> {
  type: ActionTypes.SET_VALID;
  payload: OsuFolderState['isValid'];
}

// Action type

export type Actions = SetFolderAction | SetLoadingAction | SetValidAction;
