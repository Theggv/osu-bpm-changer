import { all } from 'redux-saga/effects';

import { BeatmapSetListSaga } from '../features/BeatmapSetsList';

export function* rootSaga() {
  yield all([BeatmapSetListSaga()]);
}
