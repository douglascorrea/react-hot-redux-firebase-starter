import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.UPDATE_MESSAGES :
      return action.data.messages;
    default:
      return state;
  }
}
