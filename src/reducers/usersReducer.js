import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.UPDATE_USERS :
      return action.data.users;
    default:
      return state;
  }
}
