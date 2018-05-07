import { always, dissoc, assocPath, dissocPath } from 'ramda';
import { handleActions } from 'redux-actions';

import { AUTH_LOGGED_OUT_SUCCESS } from '../../actions/actionTypes';
import { removedRoom, refreshJoinedRooms, joinedRoom, leftRoom } from '../../actions/chatxActions';

const initialState = {};

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
  [AUTH_LOGGED_OUT_SUCCESS]: always(initialState),
}, initialState);

export default joinedRooms;
