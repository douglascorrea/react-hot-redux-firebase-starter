import { always, assoc, dissoc } from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as types from '../actions/actionTypes';

import {
  enterChat, leaveChat,
  addedRoom, removedRoom, changedRoom,
} from '../actions/chatxActions';

const enabled = handleActions({
  [enterChat]: () => true,
  [leaveChat]: () => false,
}, false);

const rooms = handleActions({
  [addedRoom]: {
    next: (state, { payload }) => ({ ...state, [payload.id]: payload }),
  },
  [removedRoom]: {
    next: (state, { payload }) => dissoc(payload.id, state),
  },
  [changedRoom]: {
    next: (state, { payload }) => assoc(payload.id, payload, state),
  },
  [types.AUTH_LOGGED_OUT_SUCCESS]: always({}),
}, {});

export default combineReducers({
  enabled,
  rooms,
});
