import { buffers, channel } from 'redux-saga';
import { put, select, take, takeEvery } from 'redux-saga/effects';

import { ConvertManager } from '../../ConvertManager';
import {
  ActionTypes,
  CreateTaskAction,
  SetProgressAction,
  SetStatusAction,
} from './actions';
import { addTask } from './operations';
import { selectTasks } from './selectors';
import { TaskState } from './types';
import { isEqual } from 'lodash';

const progressChannel = channel<SetProgressAction | SetStatusAction>(
  buffers.fixed(100)
);

function* createTask(action: CreateTaskAction): any {
  const taskId = ConvertManager.use().create(action.payload);
  const task = ConvertManager.use().get(taskId)!;

  if (!task) return;

  // Check for dublicates
  const taskStates: TaskState[] = yield select(selectTasks);

  const tasks = taskStates.map((t) => ConvertManager.use().get(t.taskId));

  if (tasks.find((t) => isEqual(t?.details, task.details))) return;

  yield put(
    addTask({
      taskId,
      progress: 0,
      status: task.status,
      options: task.details.options,
    })
  );

  task.onStatusChanged = (status) => {
    progressChannel.put({
      type: ActionTypes.SET_STATUS,
      payload: {
        status,
        taskId,
      },
    });
  };

  task.onProgress = (progress) => {
    progressChannel.put({
      type: ActionTypes.SET_PROGRESS,
      payload: {
        progress,
        taskId,
      },
    });
  };
}

function* progressWatcher(): any {
  while (true) {
    const progress = yield take(progressChannel);
    yield put(progress);
  }
}

function* statusChecker(action: SetStatusAction): any {
  if (action.payload.status === 'canceled') {
    ConvertManager.use().cancel(action.payload.taskId);
  }
}

export function* saga() {
  yield takeEvery(ActionTypes.CREATE_TASK, createTask);
  yield takeEvery(ActionTypes.SET_STATUS, statusChecker);
  yield takeEvery(progressChannel, progressWatcher);
}
