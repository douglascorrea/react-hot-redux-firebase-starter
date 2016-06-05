import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGGED_IN_SUCCESS:
      action.user.isLogged = true;
      return action.user;

    case types.USER_LOGGED_OUT_SUCCESS:
      return initialState.user;

    default:
      return state;
  }
}
