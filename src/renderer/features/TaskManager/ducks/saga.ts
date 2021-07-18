import { isEqual } from 'lodash';
import path from 'path';
import { buffers, channel } from 'redux-saga';
import { fork, put, race, select, take, takeEvery } from 'redux-saga/effects';

import {
  BeatmapSet,
  loadDiffs,
  selectSelectedSet,
} from '../../../shared/BeatmapSetsList';
import { selectSongsFolder } from '../../../shared/selectors/OsuFolder';
import { TaskManager } from '../api';
import {
  ActionTypes,
  AddTaskAction,
  CreateTaskAction,
  SetProgressAction,
  SetStatusAction,
  StartTaskAction,
} from './actions';
import { addTask, setRunningTasks, setStatus, startTask } from './operations';
import { selectRunningTasks, selectTasks } from './selectors';
import { TaskState } from './types';

const progressChannel = channel<SetProgressAction>(buffers.sliding(25));
const statusChannel = channel<SetStatusAction>(buffers.expanding(25));

function* createTaskWatcher(action: CreateTaskAction): any {
  const taskStates: TaskState[] = yield select(selectTasks);

  // Check for dublicates
  if (taskStates.find((t) => isEqual(t.context, action.payload))) return;

  const taskId = TaskManager.use().create(action.payload);

  const task = TaskManager.use().get(taskId)!;

  task.onProgress = (progress) => {
    progressChannel.put({
      type: ActionTypes.SET_PROGRESS,
      payload: { taskId, progress },
    });
  };

  task.onStatusChanged = (status, errorMessage) => {
    statusChannel.put({
      type: ActionTypes.SET_STATUS,
      payload: { taskId, status, errorMessage },
    });
  };

  // Add Task
  yield put(
    addTask({
      taskId,
      progress: 0,
      status: 'pending',
      context: action.payload,
    })
  );
}

function* taskManager(): any {
  const MAX_PARALLEL_TASKS = 4;

  while (true) {
    // Wait until ADD_TASK or SET_STATUS called
    const {
      addTask,
      statusChange,
    }: {
      addTask: AddTaskAction;
      statusChange: SetStatusAction;
    } = yield race({
      addTask: take(ActionTypes.ADD_TASK),
      statusChange: take(ActionTypes.SET_STATUS),
    });

    // If SET_STATUS called check if task is done
    if (statusChange) {
      if (
        statusChange.payload.status === 'done' ||
        statusChange.payload.status === 'error' ||
        statusChange.payload.status === 'canceled'
      ) {
        // Remove task from list of running
        yield put(
          setRunningTasks(
            (yield select(selectRunningTasks))
              .filter(
                (task: TaskState) => task.taskId !== statusChange.payload.taskId
              )
              .map((t: TaskState) => t.taskId)
          )
        );
      }
    }

    const runningTasks: TaskState[] = yield select(selectRunningTasks);

    if (runningTasks.length >= MAX_PARALLEL_TASKS) continue;

    // Select pending task from tasks list
    const tasks: TaskState[] = yield select(selectTasks);

    const pendingTask = tasks.find((t) => t.status === 'pending');

    if (!pendingTask) continue;

    // Add task to list of running
    yield put(
      setRunningTasks([
        ...runningTasks.map((t) => t.taskId),
        pendingTask.taskId,
      ])
    );

    yield put(startTask(pendingTask.taskId));
  }
}

function* putChannelStatus(): any {
  while (true) {
    const action: SetStatusAction = yield take(statusChannel);
    yield put(action);
  }
}

function* statusWatcher(action: SetStatusAction): any {
  if (action.payload.status === 'canceled') {
    TaskManager.use().cancel(action.payload.taskId);
  }
  if (action.payload.status === 'done') {
    // Update beatmapset on done
    const selectedSet: BeatmapSet = yield select(selectSelectedSet);
    const tasks: TaskState[] = yield select(selectTasks);
    const songsFolder: string = yield select(selectSongsFolder);

    if (
      path.join(songsFolder, selectedSet.folderName) ===
      tasks.find((t) => t.taskId === action.payload.taskId)?.context
        .beatmapFolder
    ) {
      yield put(loadDiffs());
    }
  }
}

function* progressWatcher(): any {
  while (true) {
    const action: SetProgressAction = yield take(progressChannel);
    yield put(action);
  }
}

function* startTaskWatcher(action: StartTaskAction): any {
  const tasks: TaskState[] = yield select(selectTasks);

  // Prevent loop
  if (tasks.find((t) => t.taskId === action.payload)?.status === 'pending')
    TaskManager.use().start(action.payload);
}

export function* saga() {
  yield fork(taskManager);
  yield fork(progressWatcher);
  yield fork(putChannelStatus);
  yield takeEvery(ActionTypes.CREATE_TASK, createTaskWatcher);
  yield takeEvery(ActionTypes.START_TASK, startTaskWatcher);
  yield takeEvery(ActionTypes.SET_STATUS, statusWatcher);
}
