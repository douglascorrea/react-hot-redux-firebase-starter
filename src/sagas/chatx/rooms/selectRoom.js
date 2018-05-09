import { all, fork } from 'redux-saga/effects';

import {
  joinedRoom, leftRoom,
  addedMessage, removedMessage, changedMessage,
} from '../../../actions/chatxActions';

import { subscribeAndDispatch } from '../../utils';

const NB_MESSAGES = 10;

export default function* selectRoomSaga(action) {
  const roomId = action.payload;
  yield all([
    fork(subscribeAndDispatch(
      `/joinedRooms/${roomId}`,
      'child_added',
      ({ id }) => joinedRoom({ room: roomId, user: id }),
    )),
    fork(subscribeAndDispatch(
      `/joinedRooms/${roomId}`,
      'child_removed',
      ({ id }) => leftRoom({ room: roomId, user: id }),
    )),
    fork(subscribeAndDispatch(
      `/messages/${roomId}`,
      'child_added',
      message => addedMessage({ room: roomId, message }),
      q => q.orderByChild('createdAt').limitToLast(NB_MESSAGES)
    )),
    fork(subscribeAndDispatch(
      `/messages/${roomId}`,
      'child_removed',
      message => removedMessage({ room: roomId, message }),
    )),
    fork(subscribeAndDispatch(
      `/messages/${roomId}`,
      'child_changed',
      message => changedMessage({ room: roomId, message }),
      q => q.orderByChild('createdAt').limitToLast(NB_MESSAGES)
    )),
  ]);
}
