import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatReducer (state = initialState.messages, action) {
  switch (action.type) {
    case types.MESSAGE_RECEIVED:
      return Object.assign({}, state, action.messages);
    default:
      return state;
  }
}
