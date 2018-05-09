import { all, takeEvery, put, select, call } from 'redux-saga/effects';

import api from '../../api/firebase';
import { getCurrentUserUID } from '../../selectors/authSelectors';
import { getCurrentRoom } from '../../selectors/chatxSelectors';
import { sendMessage, removeMessage } from '../../actions/chatxActions';

export function* sendSaga(action) {
  const { room, message } = action.payload;
  try {
    const newMessage = {
      content: message,
      author: yield select(getCurrentUserUID),
      createdAt: api.SERVER_TIMESTAMP,
    };
    yield call(api.databasePush, `/messages/${room}/`, newMessage);
  } catch (err) {
    yield put(sendMessage(err));
  }
}

export function* removeMessageSaga(action) {
  if (action.error) return;
  try {
    const messageId = action.payload;
    const currentRoom = yield select(getCurrentRoom);
    yield call(api.databaseRemove, `/messages/${currentRoom.id}/${messageId}`);
  } catch (err) {
    yield put(removeMessage(err));
  }
}

export default function* messagesSaga() {
  yield all([
    takeEvery(sendMessage, sendSaga),
    takeEvery(removeMessage, removeMessageSaga),
  ]);
}
