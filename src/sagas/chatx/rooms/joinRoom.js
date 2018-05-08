import { select } from 'redux-saga/effects';

import { getCurrentUserUID } from '../../../selectors/authSelectors';
import api from '../../../api/firebase';


export default function* joinRoomSaga(action) {
  const roomId = action.payload;
  const userId = yield select(getCurrentUserUID);
  yield api.databasePush(`/joinedRooms/${roomId}/${userId}`, true);
}
