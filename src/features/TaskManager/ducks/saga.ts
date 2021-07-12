import { put, call, takeEvery } from 'redux-saga/effects';
import { AuthApi } from '../../../services/api/backend/authApi';
import {
  AuthActionsType,
  CheckAuthActionInterface,
  LogoutAuthActionInterface,
  RequestAuthActionInterface,
} from './actions';
import { failedAuth, logoutAuth, successAuth } from './operations';

function* checkAuthAsync(action: CheckAuthActionInterface) {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      yield put(failedAuth('Invalid token'));
      return;
    }

    let statusCode: number = yield call(AuthApi.checkAuthorization, token);

    if (statusCode === 200) {
      yield put(successAuth());
    } else if (statusCode === 401) {
      yield put(failedAuth('Token is not valid'));
      yield put(logoutAuth());
    }
  } catch (error) {
    yield put(failedAuth(error));
  }
}

function* requestAuthAsync(action: RequestAuthActionInterface) {
  try {
    const user = action.payload;

    if (!user) {
      yield put(failedAuth('No user'));
      return;
    }

    const data = yield call(AuthApi.signin, user);

    if (data) {
      localStorage.setItem('token', data.token);
      yield put(successAuth());
    } else {
      yield put(failedAuth('Неправильный логин или пароль.'));
    }
  } catch (error) {
    yield put(failedAuth(error));
  }
}

function* logoutAuthAsync(action: LogoutAuthActionInterface) {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    yield put(failedAuth(error));
  }
}

export function* authSaga() {
  yield takeEvery(AuthActionsType.CHECK_AUTH, checkAuthAsync);
  yield takeEvery(AuthActionsType.REQUEST_AUTH, requestAuthAsync);
  yield takeEvery(AuthActionsType.LOGOUT_AUTH, logoutAuthAsync);
}
