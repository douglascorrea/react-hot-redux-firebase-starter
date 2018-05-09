import { takeEvery, call, put } from 'redux-saga/effects';

import { AUTH_LOGGED_IN_SUCCESS } from '../../actions/actionTypes';
import { userIsAdminSuccess } from '../../actions/userActions';
import api from '../../api/firebase';

export default function* isAdminSaga() {
  yield takeEvery(AUTH_LOGGED_IN_SUCCESS, function*(action) {
    try {
      yield call(api.GetValue, `/isAdmin/${action.userUID}`);
      yield put(userIsAdminSuccess());
    } catch (err) {
      void err;
    }
  });
}
