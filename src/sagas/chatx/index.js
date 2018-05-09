import { all, take, put, call, cancel, fork } from 'redux-saga/effects';

import api from '../../api/firebase';
import { enterChat, leaveChat, refreshJoinedRooms } from '../../actions/chatxActions';
import messagesSaga from './messages';
import usersSaga from './users';
import roomsSaga from './rooms';

export default function* chatxSaga() {
  while (true) {
    yield take(enterChat);

    const joinedRooms = yield call(api.GetValue, '/joinedRooms');
    yield put(refreshJoinedRooms(joinedRooms || {}));

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
