import { createSelector } from 'reselect';
import { RootState } from '../../../app/rootState';
import { TaskManagerState } from './types';

const select = (state: RootState): TaskManagerState => state.taskManagerState;

export const selectTasks = createSelector(select, (state) => state.tasks);
