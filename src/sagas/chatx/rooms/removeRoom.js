import { call, put, select } from 'redux-saga/effects';

import { getCurrentRoom }  from '../../../selectors/chatxSelectors';
import { removeRoom } from '../../../actions/chatxActions';
import api from '../../../api/firebase';

import selectFirstRoom from './selectFirstRoom';


export default function* removeRoomSaga(action) {
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
