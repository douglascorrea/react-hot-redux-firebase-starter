import { map, always, assoc, dissoc, assocPath, dissocPath } from 'ramda';
import { handleActions } from 'redux-actions';

import { AUTH_LOGGED_OUT_SUCCESS } from '../../actions/actionTypes';
import {
  selectRoom, leaveRoom,
  addedRoom, removedRoom, changedRoom,
  addedMessage, removedMessage, changedMessage,
  changedUserMessage, sendMessage,
} from '../../actions/chatxActions';

const initialState = {};

const rooms = handleActions({
  [selectRoom]: {
    next: (state, { payload }) => map(room => {
      if (room.id !== payload) {
        return assoc('messages', [], room);
      }
      return room;
    }, state),
  },
  [addedRoom]: {
    next: (state, { payload }) => assoc(payload.id, payload, state),
  },
  [removedRoom]: {
    next: (state, { payload }) => dissoc(payload.id, state),
  },
  [changedRoom]: {
    next: (state, { payload }) => assoc(payload.id, payload, state),
  },
  [addedMessage]: {
    next: (state, { payload: { room, message } }) => (
      assocPath([room, 'messages', message.id], message, state)
    ),
  },
  [removedMessage]: {
    next: (state, { payload: { room, message } }) => (
      dissocPath([room, 'messages', message.id], state)
    ),
  },
  [changedMessage]: {
    next: (state, { payload: { room, message } }) => (
      assocPath([room, 'messages', message.id], message, state)
    ),
  },
  [changedUserMessage]: {
    next: (state, { payload: { room, userMessage } }) => (
      assocPath([room, 'userMessage'], userMessage, state)
    ),
  },
  [sendMessage]: {
    next: (state, { payload: { room } }) => (
      assocPath([room, 'userMessage'], '', state)
    ),
  },
  [leaveRoom]: {
    next: (state, { payload }) => dissocPath([payload, 'userMessage'], state),
  },
  [AUTH_LOGGED_OUT_SUCCESS]: always(initialState),
}, initialState);

export default rooms;
