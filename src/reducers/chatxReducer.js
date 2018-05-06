import { always, assoc, dissoc, assocPath, dissocPath } from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { addedUser, removedUser, changedUser } from '../actions/usersActions';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

const LOGGED_OUT = types.AUTH_LOGGED_OUT_SUCCESS;

import {
  enterChat, leaveChat,
  selectRoom,
  addedRoom, removedRoom, changedRoom,
  refreshJoinedRooms, joinedRoom, leftRoom,
} from '../actions/chatxActions';

const enabled = handleActions({
  [enterChat]: () => true,
  [leaveChat]: () => false,
}, initialState.chatx.enabled);

const currentRoom = handleActions({
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

const joinedRooms = handleActions({
  [refreshJoinedRooms]: {
    next: (state, { payload }) => payload,
  },
  [removedRoom]: {
    next: (state, { payload }) => dissoc(payload.id, state),
  },
  [joinedRoom]: {
    next: (state, { payload: { room, user } }) => assocPath([room, user], true, state),
  },
  [leftRoom]: {
    next: (state, { payload: { room, user } }) => dissocPath([room, user], state),
  },
  [LOGGED_OUT]: always({}),
}, initialState.chatx.joinedRooms);

const users = handleActions({
  [addedUser]: {
    next: (state, { payload }) => ({ ...state, [payload.uid]: payload }),
  },
  [removedUser]: {
    next: (state, { payload }) => dissoc(payload.uid, state),
  },
  [changedUser]: {
    next: (state, { payload }) => assoc(payload.uid, payload, state),
  },
  [LOGGED_OUT]: always({}),
}, initialState.chatx.users);


export default combineReducers({
  enabled,
  users,
  rooms,
  currentRoom,
  joinedRooms,
});
