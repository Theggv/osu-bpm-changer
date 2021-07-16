import {
  ActionTypes,
  AddTaskAction,
  CreateTaskAction,
  SetProgressAction,
  SetStatusAction,
} from './actions';

export const createTask = (
  payload: CreateTaskAction['payload']
): CreateTaskAction => ({
  type: ActionTypes.CREATE_TASK,
  payload,
});

export const addTask = (payload: AddTaskAction['payload']): AddTaskAction => ({
  type: ActionTypes.ADD_TASK,
  payload,
});

export const setStatus = (
  payload: SetStatusAction['payload']
): SetStatusAction => ({
  type: ActionTypes.SET_STATUS,
  payload,
});

export const setProgress = (
  payload: SetProgressAction['payload']
): SetProgressAction => ({
  type: ActionTypes.SET_PROGRESS,
  payload,
});
