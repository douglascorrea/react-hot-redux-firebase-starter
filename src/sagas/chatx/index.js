import { fork } from 'redux-saga/effects';
import messagesSaga from './messages';

export default function* chatxSaga() {
  yield [
    fork(messagesSaga),
  ];
}
