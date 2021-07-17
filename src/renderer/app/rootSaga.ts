import { all } from 'redux-saga/effects';

import { TaskManagerSaga } from '../features/TaskManager';
import { BeatmapSetListSaga } from '../shared/BeatmapSetsList';

export function* rootSaga() {
  yield all([BeatmapSetListSaga(), TaskManagerSaga()]);
}
