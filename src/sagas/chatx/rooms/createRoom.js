import { call, put, select } from 'redux-saga/effects';

import { getCurrentUserUID } from '../../../selectors/authSelectors';
import { createRoom, selectRoom, joinRoom } from '../../../actions/chatxActions';
import api from '../../../api/firebase';


export default function* createRoomSaga(action) {
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
