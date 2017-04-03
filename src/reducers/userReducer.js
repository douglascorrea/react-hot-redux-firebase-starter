import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOADED_SUCCESS:
      return Object.assign({}, state, action.user);
    case types.USER_IS_ADMIN_SUCCESS:
      return Object.assign({}, state, {isAdmin: true});
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.user;
    default:
      return state;
  }
}
