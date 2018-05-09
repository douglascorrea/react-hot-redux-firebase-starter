import { takeEvery, call, put } from 'redux-saga/effects';

import sagaMiddleware from './middleware';
import errorsSaga from './errors';
import chatxSaga from './chatx';

import { userIsAdminSuccess } from '../actions/userActions';
import api from '../api/firebase';

function* isAdminSaga() {
  yield takeEvery('AUTH_LOGGED_IN_SUCCESS', function*(action) {
    try {
      yield call(api.GetValue, `/isAdmin/${action.userUID}`);
      yield put(userIsAdminSuccess());
    } catch (err) {
      void err;
    }
  });
}

export default function runSagas() {
  sagaMiddleware.run(errorsSaga);
  sagaMiddleware.run(chatxSaga);
  sagaMiddleware.run(isAdminSaga);
}
