import {
  all, call, fork,
  put, select, take, takeEvery,
} from 'redux-saga/effects';

import { getCurrentRoom, getFirstRoom }  from '../../selectors/chatxSelectors';
import { getCurrentUserUID } from '../../selectors/authSelectors';
import {
  createRoom, removeRoom, selectRoom, joinRoom,
  addedRoom, removedRoom, changedRoom,
} from '../../actions/chatxActions';

import api from '../../api/firebase';
import { subscribeAndDispatch } from '../utils';


export function* createRoomSaga(action) {
  if (action.error) return;
  try {
    const newRoom = {
      name: action.payload,
      author: yield select(getCurrentUserUID),
      createdAt: api.SERVER_TIMESTAMP,
    };
    const roomSnap = yield call(api.databasePush, '/rooms', newRoom);
    yield put(joinRoom(roomSnap.key));
    yield put(selectRoom(roomSnap.key));
  } catch (err) {
    yield put(createRoom(err));
  }
}

export function* selectFirstRoom() {
  const firstRoom = yield select(getFirstRoom);
  if (firstRoom) {
    yield put(selectRoom(firstRoom.id));
  }
}

export function* removeRoomSaga(action) {
  if (action.error) return;
  try {
    const roomId = action.payload;
    const currentRoom = yield select(getCurrentRoom);
    yield call(api.databaseRemove, `/joinedRooms/${roomId}`);
    yield call(api.databaseRemove, `/messages/${roomId}`);
    yield call(api.databaseRemove, `/rooms/${roomId}`);
    if (currentRoom && roomId === currentRoom.id) {
      yield call(selectFirstRoom);
    }
  } catch (err) {
    yield put(removeRoom(err));
  }
}

export default function* roomsSaga() {
  yield all([
    fork(subscribeAndDispatch('/rooms', 'child_added', addedRoom)),
    fork(subscribeAndDispatch('/rooms', 'child_removed', removedRoom)),
    fork(subscribeAndDispatch('/rooms', 'child_changed', changedRoom)),
    takeEvery(createRoom, createRoomSaga),
    takeEvery(removeRoom, removeRoomSaga),
  ]);
  yield take(addedRoom);
  yield call(selectFirstRoom);
}
