import {
  ActionTypes,
  AddTaskAction,
  CreateTaskAction,
  RemoveTaskAction,
  SetProgressAction,
  SetRunningTasksAction,
  SetStatusAction,
  StartTaskAction,
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

export const startTask = (
  payload: StartTaskAction['payload']
): StartTaskAction => ({
  type: ActionTypes.START_TASK,
  payload,
});

export const removeTask = (
  payload: RemoveTaskAction['payload']
): RemoveTaskAction => ({
  type: ActionTypes.REMOVE_TASK,
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

export const setRunningTasks = (
  payload: SetRunningTasksAction['payload']
): SetRunningTasksAction => ({
  type: ActionTypes.SET_RUNNING_TASKS,
  payload,
});
