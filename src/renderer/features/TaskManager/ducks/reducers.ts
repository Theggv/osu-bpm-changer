import produce, { Draft } from 'immer';

import { Actions, ActionTypes } from './actions';
import { TaskManagerState } from './types';

const initialState: TaskManagerState = {
  tasks: [],
  runningTasks: [],
};

export const reducer = produce(
  (draft: Draft<TaskManagerState>, action: Actions) => {
    switch (action.type) {
      case ActionTypes.CREATE_TASK:
        break;

      case ActionTypes.ADD_TASK:
        draft.tasks = [...draft.tasks, action.payload];
        break;

      case ActionTypes.REMOVE_TASK:
        draft.tasks = draft.tasks.filter((t) => t.taskId !== action.payload);
        break;

      case ActionTypes.SET_STATUS:
        draft.tasks = draft.tasks.map((task) => {
          if (task.taskId === action.payload.taskId) {
            task.status = action.payload.status;
            task.errorMessage = action.payload.errorMessage;
          }

          return task;
        });
        break;

      case ActionTypes.SET_PROGRESS:
        draft.tasks = draft.tasks.map((task) => {
          if (task.taskId === action.payload.taskId)
            task.progress = action.payload.progress;

          return task;
        });
        break;

      case ActionTypes.SET_RUNNING_TASKS:
        draft.runningTasks = action.payload;
        break;

      default:
        break;
    }
  },
  initialState
);
