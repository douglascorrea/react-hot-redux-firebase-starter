import { call, fork, put, take } from 'redux-saga/effects';
import * as firebase from 'firebase/firebase-browser';
import { eventChannel, takeEvery } from 'redux-saga';

import {
  fetchMessagesError,
  fetchMessagesSuccess,
  pushMessagesError,
  pushMessagesSuccess
} from '../actions/messagesActions';
import { firebaseConfig } from '../config';
import firebaseApi from '../api/firebase';
import * as types from '../actions/actionTypes';

const MAX_MESSAGES = 10;
const PATH = '/messages/';

// Maybe not the better way to intialize firebase
firebase.initializeApp(firebaseConfig);

export function* writeMessage({ message }) {
  try {
    yield call(firebaseApi.databasePush, PATH, message);
    yield put(pushMessagesSuccess(message));
  } catch (error) {
    yield put(pushMessagesError());
  }
}

export function* pushMessage() {
  yield takeEvery(types.LAUNCH_PUSH_MESSAGES, writeMessage);
}

export function createEventChannel() {
  const listener = eventChannel(emit => {
    firebaseApi.databasePathValueLimitToLast(PATH, MAX_MESSAGES, snap =>
      emit(snap.val() || {})
    );
    return () => {
      firebaseApi.unsubDatabase(PATH);
    };
  });
  return listener;
}

export function* watchFetchMessages() {
  const updateMessages = createEventChannel();
  while (true) {
    try {
      const messages = yield take(updateMessages);
      yield put(fetchMessagesSuccess(messages));
    } catch (error) {
      yield put(fetchMessagesError(error));
    }
  }
}

function* watchRequests() {
    yield takeEvery(types.REQUEST, watchFetchMessages);
}

export default function* startFireBase() {
  yield fork(watchRequests);
  yield fork(pushMessage);
}
