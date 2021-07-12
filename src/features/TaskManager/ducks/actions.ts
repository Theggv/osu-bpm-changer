import { Action } from 'redux';
import { TaskStore } from './types';

// Action Types enum

export enum ActionTypes {
  CREATE_TASK = 'TaskManager/CREATE_TASK',
  CANCEL_TASK = 'TaskManager/CANCEL_TASK',
  SET_STATE = 'TaskManager/SET_STATE',
  SET_PROGRESS = 'TaskManager/SET_PROGRESS',
}

// Action interfaces

export interface AddTaskAction extends Action<ActionTypes> {
  type: ActionTypes.CREATE_TASK;
}

export interface CancelTaskAction extends Action<ActionTypes> {
  type: ActionTypes.CANCEL_TASK;
  payload: TaskStore['taskId'];
}

export interface SetStateAction extends Action<ActionTypes> {
  type: ActionTypes.SET_STATE;
  payload: TaskStore['state'];
}

export interface SetProgressAction extends Action<ActionTypes> {
  type: ActionTypes.SET_PROGRESS;
  payload: TaskStore['progress'];
}

// Action type

export type AuthActions =
  | AddTaskAction
  | CancelTaskAction
  | SetStateAction
  | SetProgressAction;
