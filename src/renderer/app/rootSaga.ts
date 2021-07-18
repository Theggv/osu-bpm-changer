import { all } from 'redux-saga/effects';

import { TaskManagerSaga } from '../features/TaskManager';
import { OsuFolderSaga } from '../features/OsuFolder';
import { BeatmapSetListSaga } from '../shared/BeatmapSetsList';

export function* rootSaga() {
  yield all([BeatmapSetListSaga(), TaskManagerSaga(), OsuFolderSaga()]);
}
