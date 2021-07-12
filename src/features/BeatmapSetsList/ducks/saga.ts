import { call, put, takeEvery, select } from 'redux-saga/effects';

import { ActionTypes, LoadDiffsAction, LoadSongsListAction } from './actions';
import { loadDiffs, setDiffs, setLoading, setSongsList } from './operations';
import { BeatmapSet } from './types';
import { selectSelectedItem } from './selectors';

import {
  Beatmap,
  BeatmapSetFolder,
  readBeatmapSetFolder,
  readSongsFolder,
} from '../../../shared/Osu';
import {
  selectOsuFolder,
  selectSongsFolder,
} from '../../../shared/selectors/OsuFolder';

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
    console.warn(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* preloadDiffs(): any {
  yield put(loadDiffs());
}

function* loadDifficulties(_action: LoadDiffsAction): any {
  try {
    const songsFolder: string = yield select(selectSongsFolder);
    const beatmapSet: BeatmapSet | undefined = yield select(selectSelectedItem);

    if (!beatmapSet) return;

    const diffs: Beatmap[] = yield call(
      readBeatmapSetFolder,
      songsFolder,
      beatmapSet
    );

    yield put(setDiffs({ id: beatmapSet.folderName, diffs }));
  } catch (error) {
    console.warn(error);
  }
}

export function* saga() {
  yield takeEvery(ActionTypes.LOAD_SONGS_LIST, loadBeatmaps);
  yield takeEvery(ActionTypes.SET_SELECTED, preloadDiffs);
  yield takeEvery(ActionTypes.LOAD_DIFFS, loadDifficulties);
}
