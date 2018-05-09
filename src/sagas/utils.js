import { compose } from 'ramda';
import { eventChannel } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';

import api from '../api/firebase';

export const createSubscriptionChan = compose(eventChannel, api.Subscribe);

export const subscribeAndDispatch = (path, event, actionCreator, prepareQuery) => (
  function* saga() {
    const chan = yield call(createSubscriptionChan, path, event, prepareQuery);
    try {
      while (true) {
        const payload = yield take(chan);
        yield put(actionCreator(payload));
      }
    } finally {
      chan.close();
    }
  }
);
