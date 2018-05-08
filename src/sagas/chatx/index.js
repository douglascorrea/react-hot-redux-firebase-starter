import { all, take, cancel, fork } from 'redux-saga/effects';

import { enterChat, leaveChat } from '../../actions/chatxActions';
import messagesSaga from './messages';
import usersSaga from './users';
import roomsSaga from './rooms';

export default function* chatxSaga() {
  while (true) {
    yield take(enterChat);

    const tasks = yield all([
      fork(messagesSaga),
      fork(usersSaga),
      fork(roomsSaga),
    ]);

    yield take(leaveChat);

    for (const task of tasks) {
      yield cancel(task);
    }
  }
}
