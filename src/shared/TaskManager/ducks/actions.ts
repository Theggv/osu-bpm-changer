import { Action } from 'redux';
import { ConvertTaskDetails } from '../../ConvertManager/ConvertTask';
import { TaskState } from './types';

// Action Types enum

export enum ActionTypes {
  CREATE_TASK = 'TaskManager/CREATE_TASK',
  ADD_TASK = 'TaskManager/ADD_TASK',
  SET_STATUS = 'TaskManager/SET_STATUS',
  SET_PROGRESS = 'TaskManager/SET_PROGRESS',
}

// Action interfaces

export interface CreateTaskAction extends Action<ActionTypes> {
  type: ActionTypes.CREATE_TASK;
  payload: ConvertTaskDetails;
}

export interface AddTaskAction extends Action<ActionTypes> {
  type: ActionTypes.ADD_TASK;
  payload: TaskState;
}

export interface SetStatusAction extends Action<ActionTypes> {
  type: ActionTypes.SET_STATUS;
  payload: {
    taskId: TaskState['taskId'];
    status: TaskState['status'];
  };
}

export interface SetProgressAction extends Action<ActionTypes> {
  type: ActionTypes.SET_PROGRESS;
  payload: {
    taskId: TaskState['taskId'];
    progress: TaskState['progress'];
  };
}

// Action type

export type Actions =
  | CreateTaskAction
  | AddTaskAction
  | SetStatusAction
  | SetProgressAction;
