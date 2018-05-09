import { select } from 'redux-saga/effects';

import { getCurrentUserUID } from '../../../selectors/authSelectors';
import api from '../../../api/firebase';


export default function* leaveRoomSaga(action) {
  const roomId = action.payload;
  const userId = yield select(getCurrentUserUID);
  yield api.databaseRemove(`/joinedRooms/${roomId}/${userId}`);
}
