import { always, assoc, dissoc } from 'ramda';
import { handleActions } from 'redux-actions';

import { addedUser, removedUser, changedUser, leaveChat } from '../../actions/chatxActions';
import { AUTH_LOGGED_OUT_SUCCESS } from '../../actions/actionTypes';

const initialState = {};

const users = handleActions({
  [addedUser]: {
    next: (state, { payload }) => assoc(payload.id, payload, state),
  },
  [removedUser]: {
    next: (state, { payload }) => dissoc(payload.id, state),
  },
  [changedUser]: {
    next: (state, { payload }) => assoc(payload.id, payload, state),
  },
  [AUTH_LOGGED_OUT_SUCCESS]: always(initialState),
  [leaveChat]: always(initialState),
}, initialState);


export default users;
