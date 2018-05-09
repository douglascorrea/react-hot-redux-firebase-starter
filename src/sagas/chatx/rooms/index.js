import {
  all, call, fork,
  takeEvery, takeLatest,
  take,
} from 'redux-saga/effects';

import {
  createRoom, removeRoom, selectRoom, joinRoom, leaveRoom,
  addedRoom, removedRoom, changedRoom,
} from '../../../actions/chatxActions';

import { subscribeAndDispatch } from '../../utils';

import selectFirstRoom from './selectFirstRoom';
import createRoomSaga from './createRoom';
import removeRoomSaga from './removeRoom';
import joinRoomSaga from './joinRoom';
import leaveRoomSaga from './leaveRoom';
import selectRoomSaga from './selectRoom';


export default function* roomsSaga() {
  yield all([
    fork(subscribeAndDispatch('/rooms', 'child_added', addedRoom)),
    fork(subscribeAndDispatch('/rooms', 'child_removed', removedRoom)),
    fork(subscribeAndDispatch('/rooms', 'child_changed', changedRoom)),
    takeEvery(createRoom, createRoomSaga),
    takeEvery(removeRoom, removeRoomSaga),
    takeEvery(joinRoom, joinRoomSaga),
    takeEvery(leaveRoom, leaveRoomSaga),
    takeLatest(selectRoom, selectRoomSaga),
  ]);
  yield take(addedRoom);
  yield call(selectFirstRoom);
}
