import * as types from '../actions/actionTypes';
import initialState from './initialState';
import prop from 'lodash/fp/prop';
import { createSelector } from 'reselect';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return Object.assign({}, state, action.payload);
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

export const getUser = state => state.user;
export const getUserUid = createSelector(getUser, user => prop('uid')(user));
export const getUserEmail = createSelector(getUser, user => prop('email')(user));