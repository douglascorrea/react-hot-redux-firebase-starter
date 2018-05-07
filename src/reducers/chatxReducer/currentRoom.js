import { handleActions } from 'redux-actions';

import { AUTH_LOGGED_OUT_SUCCESS } from '../../actions/actionTypes';
import { selectRoom } from '../../actions/chatxActions';

const initialState = null;

const currentRoom = handleActions({
  [selectRoom]: (state, action) => action.payload,
  [AUTH_LOGGED_OUT_SUCCESS]: () => initialState,
}, initialState);

export default currentRoom;
