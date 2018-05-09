import { all, fork } from 'redux-saga/effects';

import { addedUser, removedUser, changedUser } from '../../actions/chatxActions';
import { subscribeAndDispatch } from '../utils';

export default function* usersSaga() {
  yield all([
    fork(subscribeAndDispatch('/users', 'child_added', addedUser)),
    fork(subscribeAndDispatch('/users', 'child_removed', removedUser)),
    fork(subscribeAndDispatch('/users', 'child_changed', changedUser)),
  ]);
}
