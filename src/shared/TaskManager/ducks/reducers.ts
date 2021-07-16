import produce, { Draft } from 'immer';
import { Actions, ActionTypes } from './actions';
import { TaskManagerState } from './types';

const initialState: TaskManagerState = {
  tasks: [],
};

export const reducer = produce(
  (draft: Draft<TaskManagerState>, action: Actions) => {
    switch (action.type) {
      case ActionTypes.CREATE_TASK:
        break;

      case ActionTypes.ADD_TASK:
        draft.tasks = [...draft.tasks, action.payload];
        break;

      case ActionTypes.SET_STATUS:
        draft.tasks = draft.tasks.map((task) => {
          if (task.taskId === action.payload.taskId)
            task.status = action.payload.status;

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

      default:
        break;
    }
  },
  initialState
);
