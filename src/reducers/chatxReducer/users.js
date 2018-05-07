import { always, assoc, dissoc } from 'ramda';
import { handleActions } from 'redux-actions';

import { addedUser, removedUser, changedUser } from '../../actions/chatxActions';
import { AUTH_LOGGED_OUT_SUCCESS } from '../../actions/actionTypes';

const initialState = {};

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
  [AUTH_LOGGED_OUT_SUCCESS]: always(initialState),
}, initialState);


export default users;
