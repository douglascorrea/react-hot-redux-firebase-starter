import { compose } from 'ramda';
import { eventChannel } from 'redux-saga';
import { take, put, call, cancelled } from 'redux-saga/effects';

import api from '../api/firebase';

const Subscribe = compose(eventChannel, api.Subscribe);

export const subscribeAndDispatch = (path, event, actionCreator) => (
  function* saga() {
    const chan = yield call(Subscribe, path, event);
    try {
      while (true) {
        const payload = yield take(chan);
        yield put(actionCreator(payload));
      }
    } finally {
      if (yield cancelled()) {
        chan.close();
      }
    }
  }
);
