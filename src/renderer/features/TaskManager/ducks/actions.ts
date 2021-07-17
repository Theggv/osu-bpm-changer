import { Action } from 'redux';

import { TaskManagerState, TaskState } from './types';

// Action Types enum

export enum ActionTypes {
  CREATE_TASK = 'TaskManager/CREATE_TASK',
  ADD_TASK = 'TaskManager/ADD_TASK',
  START_TASK = 'TaskManager/START_TASK',

  SET_STATUS = 'TaskManager/SET_STATUS',
  SET_PROGRESS = 'TaskManager/SET_PROGRESS',

  SET_RUNNING_TASKS = 'TaskManager/SET_RUNNING_TASKS',
}

// Action interfaces

export interface CreateTaskAction extends Action<ActionTypes> {
  type: ActionTypes.CREATE_TASK;
  payload: TaskState['context'];
}

export interface AddTaskAction extends Action<ActionTypes> {
  type: ActionTypes.ADD_TASK;
  payload: TaskState;
}

export interface StartTaskAction extends Action<ActionTypes> {
  type: ActionTypes.START_TASK;
  payload: TaskState['taskId'];
}

export interface SetStatusAction extends Action<ActionTypes> {
  type: ActionTypes.SET_STATUS;
  payload: {
    taskId: TaskState['taskId'];
    status: TaskState['status'];
    errorMessage?: TaskState['errorMessage'];
  };
}

export interface SetProgressAction extends Action<ActionTypes> {
  type: ActionTypes.SET_PROGRESS;
  payload: {
    taskId: TaskState['taskId'];
    progress: TaskState['progress'];
  };
}

export interface SetRunningTasksAction extends Action<ActionTypes> {
  type: ActionTypes.SET_RUNNING_TASKS;
  payload: TaskManagerState['runningTasks'];
}

// Action type

export type Actions =
  | CreateTaskAction
  | AddTaskAction
  | StartTaskAction
  | SetStatusAction
  | SetProgressAction
  | SetRunningTasksAction;
