import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects';

import {
  Beatmap,
  BeatmapSetFolder,
  readBeatmapSetFolder,
  readSongsFolder,
} from '../../Osu';
import { selectOsuFolder, selectSongsFolder } from '../../selectors/OsuFolder';
import { randomInt } from '../../utils/math';
import { ActionTypes, LoadDiffsAction, LoadSongsListAction } from './actions';
import {
  loadDiffs,
  setDiffs,
  setLoading,
  setSelectedDiff,
  setSongsList,
} from './operations';
import { selectSelectedSet } from './selectors';
import { BeatmapSet } from './types';

function* loadBeatmaps(_action: LoadSongsListAction): any {
  yield put(setLoading(true));
  yield put(setSongsList([]));

  const osuFolder: string = yield select(selectOsuFolder);

  try {
    const songs: BeatmapSetFolder[] = yield call(readSongsFolder, osuFolder);

    yield put(
      setSongsList(songs.map((value) => ({ ...value, difficulties: [] })))
    );
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* loadDifficulties(_action: LoadDiffsAction): any {
  try {
    const songsFolder: string = yield select(selectSongsFolder);
    const beatmapSet: BeatmapSet | undefined = yield select(selectSelectedSet);

    if (!beatmapSet) return;

    const diffs: Beatmap[] = yield call(
      readBeatmapSetFolder,
      songsFolder,
      beatmapSet
    );

    if (!diffs || !diffs.length) return;

    yield put(setDiffs({ id: beatmapSet.folderName, diffs }));

    yield put(
      setSelectedDiff({
        beatmapSet: beatmapSet.folderName,
        difficulty: diffs[randomInt(diffs.length)].metadata.Version,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

function* nextSelectedItemChange(): any {
  while (true) {
    yield take(ActionTypes.SET_SELECTEDSET);

    yield put(loadDiffs());
  }
}

export function* saga() {
  yield takeEvery(ActionTypes.LOAD_SONGS_LIST, loadBeatmaps);
  yield takeEvery(ActionTypes.LOAD_DIFFS, loadDifficulties);
  yield fork(nextSelectedItemChange);
}
