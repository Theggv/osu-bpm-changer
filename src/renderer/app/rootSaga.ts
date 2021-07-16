import { all } from 'redux-saga/effects';

import { BeatmapSetListSaga } from '../shared/BeatmapSetsList';
import { TaskManagerSaga } from '../shared/TaskManager';

export function* rootSaga() {
  yield all([BeatmapSetListSaga(), TaskManagerSaga()]);
}
