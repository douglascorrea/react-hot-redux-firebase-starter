import { always, assoc, dissoc } from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as types from '../actions/actionTypes';
import initialState from './initialState';

const LOGGED_OUT = types.AUTH_LOGGED_OUT_SUCCESS;

import {
  enterChat, leaveChat,
  selectRoom,
  addedRoom, removedRoom, changedRoom,
} from '../actions/chatxActions';

const enabled = handleActions({
  [enterChat]: () => true,
  [leaveChat]: () => false,
}, initialState.chatx.enabled);

const currentRoom = handleActions({
  [addedRoom]: {
    next: (state, { payload }) => {
      if (!state) {
        return payload.id;
      }
      return state;
    },
  },
  [selectRoom]: (state, action) => action.payload,
  LOGGED_OUT: always(null),
}, initialState.chatx.currentRoom);

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
  [LOGGED_OUT]: always({}),
}, initialState.chatx.rooms);

export default combineReducers({
  enabled,
  currentRoom,
  rooms,
});
