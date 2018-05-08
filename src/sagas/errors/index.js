import toastr from 'toastr';
import { call, takeEvery } from 'redux-saga/effects';

export const printErrors = function*(action) {
  if (action.error) {
    const message = `[${action.type}] ${action.payload.message}`;
    yield call(toastr.error, message);
  }
};

export default function* errorsSaga() {
  // take all actions
  yield takeEvery('*', printErrors);
}
