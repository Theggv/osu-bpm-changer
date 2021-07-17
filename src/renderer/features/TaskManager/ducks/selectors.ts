import { createSelector } from 'reselect';
import { RootState } from '../../../app/rootState';
import { TaskManagerState } from './types';

const select = (state: RootState): TaskManagerState => state.taskManagerState;

const selectRunningTasksId = createSelector(
  select,
  (state) => state.runningTasks
);

export const selectTasks = createSelector(select, (state) => state.tasks);

export const selectRunningTasks = createSelector(
  selectRunningTasksId,
  selectTasks,
  (runningTasks, tasks) =>
    tasks.filter((task) => runningTasks.find((id) => id === task.taskId))
);
