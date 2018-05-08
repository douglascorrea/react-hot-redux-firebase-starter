import { takeEvery, put, select, call } from 'redux-saga/effects';

import api from '../../api/firebase';
import { getCurrentUserUID } from '../../selectors/authSelectors';
import { sendMessage } from '../../actions/chatxActions';

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

export default function* messagesSaga() {
  yield takeEvery(sendMessage, sendSaga);
}
