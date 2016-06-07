import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTH_INITIALIZATION_DONE:
      return Object.assign({}, state, {initialized: true});

    case types.AUTH_LOGGED_IN_SUCCESS:
      return Object.assign({}, state, {
        isLogged: true,
        currentUserUID: action.userUID
      });

    case types.AUTH_LOGGED_OUT_SUCCESS:
      return Object.assign({}, state, {
        isLogged: false,
        currentUserUID: null
      });
    default:
      return state;
  }
}
