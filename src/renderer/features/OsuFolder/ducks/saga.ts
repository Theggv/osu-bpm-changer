import find from 'find-process';
import path from 'path';
import { call, put, takeEvery } from 'redux-saga/effects';
import Registry from 'winreg';
import { isOsuFolder } from '../../../shared/Osu';

import { ActionTypes, SetLoadingAction } from './actions';
import { setFolder, setLoading, setValid } from './operations';

const tryFindOsuByRegistry = async (): Promise<string | null> => {
  const registry = new Registry({
    hive: Registry.HKCR,
    key: '\\osu\\shell\\open\\command',
  });

  return new Promise((resolve, reject) => {
    registry.values((err, result) => {
      if (err || !result.length) resolve(null);

      const [osuPath] = result[0].value
        .split(' ')
        .map((x) => x.replaceAll('"', ''));

      if (osuPath)
        resolve(path.join(osuPath.substring(0, osuPath.indexOf('osu!.exe'))));
      else resolve(null);
    });
  });
};

const tryFindOsuByProcess = async (): Promise<string | null> => {
  try {
    const res = await find('name', 'osu!', true);

    if (!res || !res.length) return null;

    const base = res[0].cmd.replace('"', '');

    const songsPath = path.join(base.substring(0, base.indexOf('osu!.exe')));

    return songsPath;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function* loadingWatcher(action: SetLoadingAction): any {
  if (!action.payload) return;

  try {
    let folder: string | null = yield call(tryFindOsuByProcess);

    if (!folder) folder = yield call(tryFindOsuByRegistry);

    if (!folder) {
      // just to not DRY
      throw new Error('');
    } else {
      const isValid: boolean = yield call(isOsuFolder, folder);

      yield put(setFolder(folder));
      yield put(setLoading(false));
      yield put(setValid(isValid));
    }
  } catch (error) {
    yield put(setFolder(''));
    yield put(setLoading(false));
    yield put(setValid(false));
  }
}

export function* saga() {
  yield takeEvery(ActionTypes.SET_LOADING, loadingWatcher);
}
