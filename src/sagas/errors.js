import toastr from 'toastr';
import { take, call } from 'redux-saga/effects';

export default function* errorsSaga() {
  while (true) {
    const action = yield take('*');
    if (action.error) {
      const message = `[${action.type}] ${action.payload.message}`;
      yield call(toastr.error, message);
    }
  }
}
