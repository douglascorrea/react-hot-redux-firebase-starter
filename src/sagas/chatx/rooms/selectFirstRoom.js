import { select, put } from 'redux-saga/effects';

import { getFirstRoom }  from '../../../selectors/chatxSelectors';
import { selectRoom }  from '../../../actions/chatxActions';

export default function* selectFirstRoom() {
  const firstRoom = yield select(getFirstRoom);
  if (firstRoom) {
    yield put(selectRoom(firstRoom.id));
  }
}
